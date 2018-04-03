import * as actionType from './actions';
import {utility} from '../../common/helper/utility';

const initializeState = {
    user: {
        userId: '',
        token: ''
    },
    inProcess: false,
    error: false,
    errorMessage: '',
    login: false,
    timeout: false,
}

const reducer = (state = initializeState, action) => {
    switch (action.type) {
        case actionType.AUTH.SET_USER:
            const newState = {
                user: {userId: action.user.id, token: action.user.token},
                error: false,
                errorMessage: '',
                inProcess: false,
                login: true
            };
            return utility(state, newState);
        case actionType.AUTH.AUTH_FAIL:
            return utility(state, {error: true, errorMessage: convertingErrorMessage(action.error), inProcess: false});
        case actionType.AUTH.SET_AUTH_IN_PROCESS:
            return utility(state, {error: false, inProcess: true, errorMessage: ''});
        case actionType.AUTH.AUTH_SIGN_OUT:
            return utility(state, initializeState);
        case actionType.AUTH.AUTH_TIME_OUT:
            return utility(state, {timeout: true});
        case actionType.AUTH.AUTH_RESET_ERROR:
            return utility(state, {error: false, errorMessage: ''});
        default:
            return state;
    }
}

const convertingErrorMessage = (message) => {
    switch (message) {
        case 'EMAIL_EXISTS':
            return 'The email address is already in use by another account';
        case 'OPERATION_NOT_ALLOWED':
            return 'Your account has been disabled';
        case 'TOO_MANY_ATTEMPTS_TRY_LATER':
            return 'We have blocked all requests from this device due to unusual activity. Try again later.';
        case 'EMAIL_NOT_FOUND':
            return 'There is no user record corresponding to this identifier. The user may have been deleted.';
        case 'INVALID_PASSWORD':
            return 'The password is invalid or the user does not have a password.';
        case 'USER_DISABLED':
            return 'The user account has been disabled by an administrator.';
        default:
            return message;
    }
};


export default reducer;