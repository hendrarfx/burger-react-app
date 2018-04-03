import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actionType from '../../store/auth/actions';

class SignOut extends Component {
    componentDidMount() {
        this.props.logout();
    }

    render() {
        return <Redirect to="/signin"/>
    }
}

const mapsDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actionType.logout())
    };
};
export default connect(null, mapsDispatchToProps)(SignOut);