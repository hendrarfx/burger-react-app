import * as saga from './saga';
import * as actionType from './actions';
import {takeEvery} from 'redux-saga';

function* watch() {
    yield takeEvery(actionType.MY_ORDER.FETCH_ORDER, saga.fetchOrder);
}

export default watch;