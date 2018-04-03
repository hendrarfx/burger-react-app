import React, {Component} from 'react';
import {Inputs, checkValidity, checkFormValid, getFormValueJSONObject} from '../../components/UI/Input/Inputs';
import classes from './Register.css';
import {NavLink} from 'react-router-dom';
import * as actionType from '../../store/auth/actions';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';

class Register extends Component {
    state = {
        form: [
            {
                id: 'name',
                label: 'name',
                config: {
                    elementType: 'input-text',
                    elementConfig: {
                        placeholder: 'Your Name'
                    },
                    validation: {
                        required: true
                    }
                },
                valid: false,
                validationMessage: [],
                touched: false,
                value: ''
            },
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
                id: 'phone',
                label: 'Your phone',
                config: {
                    elementType: 'input-phone',
                    elementConfig: {
                        placeholder: 'Your Phone Number'
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
                        required: true,
                        minlength: 6
                    }
                },
                valid: false,
                validationMessage: [],
                touched: false,
                value: ''
            }
        ],
        registerObject: {},
        formIsValid: false
    }

    inputChangedHandler = (event, id) => {
        let authForm = [...this.state.form];
        let selected = {...authForm[id]};
        selected.value = event.target.value;
        checkValidity(selected);
        authForm[id] = selected;
        let formValid = checkFormValid(authForm);
        const jsonObj = getFormValueJSONObject(authForm);
        this.setState({form: authForm, formIsValid: formValid, registerObject: jsonObj});
    }

    componentWillMount() {
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

        return <div className={classes.Register}>
            {spinner}
            <h1>REGISTER</h1>
            <hr/>
            <Inputs form={this.state.form} changeHandler={this.inputChangedHandler}/>
            <button className="btn btn-success" onClick={() => this.props.registerUser(this.state.registerObject)}
                    disabled={!this.state.formIsValid}
                    style={{width: '100%'}}>REGISTER
            </button>

            <div style={{marginTop: '25px', marginBottom: '10px', textAlign: 'center', color: 'red'}}>
                {this.props.errorMessage}</div>

            <div className={classes.RegisterPanel}>
                If you have account, please <NavLink to="/signin">sign in</NavLink> here
            </div>
        </div>;
    }
}

const mapsStateToProps = state => {
    return {
        authInProcess: state.auth.inProcess,
        error: state.auth.error,
        errorMessage: state.auth.errorMessage,
        user: state.auth.user,
        isLogin: state.auth.login
    };
};

const mapsDispatchToProps = dispatch => {
    return {
        registerUser: (user) => dispatch(actionType.registerUser(user)),
        resetError: () => dispatch(actionType.resetError())
    };
};
export default connect(mapsStateToProps, mapsDispatchToProps)(Register);