import * as saga from './saga';
import * as actionType from './actions';
import {takeEvery} from 'redux-saga/effects';

function* watch() {
    yield takeEvery(actionType.ACTION.FETCH_SINGLE_USER_PROFILE, saga.fetchSingleUserProfile);
}

export default watch;