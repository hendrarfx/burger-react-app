import * as authSaga from './saga';
import * as actionType from './actions';
import {takeEvery, all} from 'redux-saga/effects';

function* watchAuth() {
    yield all([
        takeEvery(actionType.AUTH.AUTH_INITIATE_SIGN_OUT, authSaga.logout),
        takeEvery(actionType.AUTH.AUTH_INITIATE_CHECK_OUT, authSaga.checkOutTimeOut),
        takeEvery(actionType.AUTH.AUTH_REGISTER, authSaga.register),
        takeEvery(actionType.AUTH.AUTH_LOGIN, authSaga.login),
        takeEvery(actionType.AUTH.AUTH_CHECK_FROM_LOCAL_STORAGE, authSaga.checkAuthFromLocalStorage)
    ]);

}

export default watchAuth;