import React, {Component} from 'react';
import {Inputs, checkValidity,checkFormValid,getFormValueJSONObject} from '../../components/UI/Input/Inputs';
import classes from './SignIn.css';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actionType from '../../store/auth/actions';
import Spinner from '../../components/UI/Spinner/Spinner';

class SignIn extends Component {
    state = {
        form: [
            {
                id: 'email',
                label: 'Your Email',
                config: {
                    elementType: 'input-email',
                    elementConfig: {
                        placeholder: 'Your Email'
                    },
                    validation: {
                        required: true
                    }
                },
                valid: false,
                validationMessage: [],
                touched: false,
                value: ''
            }, {
                id: 'password',
                label: 'Password',
                config: {
                    elementType: 'input-password',
                    elementConfig: {
                        type: 'password',
                        placeholder: 'Your Password'
                    },
                    validation: {
                        required: true
                    }
                },
                valid: false,
                validationMessage: [],
                touched: false,
                value: ''
            }
        ],
        loginObject:{}
    }

    inputChangedHandler = (event, id) => {
        let authForm = [...this.state.form];
        let selected = {...authForm[id]};
        selected.value = event.target.value;
        checkValidity(selected);
        authForm[id] = selected;
        const formValid = checkFormValid(authForm);
        const jsonObj = getFormValueJSONObject(authForm);
        this.setState({form: authForm, formIsValid: formValid,loginObject:jsonObj});
    }

    componentWillMount(){
        this.props.resetError();
    }

    componentDidUpdate() {
        if (this.props.isLogin) {
            this.props.history.push('/');
        }
    }

    render() {
        let spinner = null;
        if (this.props.authInProcess) spinner = <Spinner show={true} message="Please Wait..."/>
        return <div className={classes.SignIn}>
            {spinner}
            <h1>SIGN IN</h1>
            <hr/>
            <Inputs form={this.state.form} changeHandler={this.inputChangedHandler}/>
            <button className="btn btn-success" onClick={()=>this.props.login(this.state.loginObject)}
                    disabled={!this.state.formIsValid} style={{width: '100%'}}>SIGN IN</button>
            <div style={{marginTop:'25px',marginBottom:'10px',textAlign:'center',color:'red'}}>
                {this.props.errorMessage}</div>
            <div className={classes.RegisterPanel}>
                If you don't have account, please <NavLink to="/register">register</NavLink> here
            </div>
        </div>;
    }
}

const mapsStateToProps = state => {
    return {
        authInProcess: state.auth.inProcess,
        error: state.auth.error,
        errorMessage: state.auth.errorMessage,
        isLogin:state.auth.login
    };
};

const mapsDispatchToProps = dispatch => {
    return {
        login: (user) => dispatch(actionType.loginUser(user)),
        resetError: () => dispatch(actionType.resetError())
    };
};
export default connect(mapsStateToProps,mapsDispatchToProps)(SignIn);