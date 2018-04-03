import React, {Component} from 'react';
import classes from './Spinner.css';
import Wrapper from '../../../common/hoc/Wrapper';
import Backdrop from '../Backdrop/Backdrop'
import PropTypes from 'prop-types';

class Spinner extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show;
    }

    render() {
        return (
            <Wrapper>
                <Backdrop show={this.props.show} closed={this.props.closed}/>
                <div className={classes.Spinner}>

                    <div className={classes.SpinnerImage}>
                    </div>
                    <h4> {this.props.message}</h4>
                </div>
            </Wrapper>
        );
    }
}

Spinner.propTypes = {
    show: PropTypes.bool.isRequired,
    message:PropTypes.string.isRequired
};

Spinner.defaultProps = {
    show: false
};

export default Spinner;