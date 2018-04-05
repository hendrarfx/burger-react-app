import React, {Component} from 'react';
import classes from './Modal.css';
import Wrapper from '../../../common/hoc/Wrapper'
import Backdrop from '../../../components/UI/Backdrop/Backdrop'
import PropTypes from 'prop-types';

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show;
    }

    render() {
        let css = [classes.Modal];
        this.props.show ? css.push(classes.ModalOpen) : css.push(classes.ModalClose);
        return (
            <Wrapper>
                <Backdrop show={this.props.show} closed={this.props.closed}/>
                <div className={css.join(' ')}>
                    {this.props.children}
                </div>
            </Wrapper>
        );
    }
}

Modal.propTypes = {
    show: PropTypes.bool.isRequired
};

Modal.defaultProps = {
    show: false
};

export default Modal;