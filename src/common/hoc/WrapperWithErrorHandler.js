import React, {Component} from 'react';
import Wrapper from './Wrapper';
import Modal from '../../components/UI/Modal/Modal';

const wrapperWithErrorHandler = (WrappedComponent, axios) => {

    return class extends Component {
        state = {
            error: null
        };

        componentWillMount() {
            this.requestInterceptor=axios.interceptors.request.use(request => {
                this.setState({
                    error: null
                });
                return request;
            });

            this.responseInterceptor=axios.interceptors.response.use(null, error => {
                this.setState({
                    error: error
                });
            });
        }

        componentWillUnmount(){
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.response.eject(this.responseInterceptor);
        }

        onClosedHandler = () => {
            this.setState({
                error: null
            });
        }

        render() {
            let modal = null;

            if (this.state.error) {
                modal = <Modal show={this.state.error!=null?true:false} closed={this.onClosedHandler}>
                    <h4>Error</h4>
                    <hr />
                    {this.state.error ? this.state.error.message : null}
                </Modal>;
            }

            return (<Wrapper>
                {modal}
                <WrappedComponent {...this.props} />
            </Wrapper>);
        }
    }
}

export default wrapperWithErrorHandler;