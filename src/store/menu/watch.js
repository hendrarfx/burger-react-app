import * as saga from './saga';
import * as actionType from './actions';
import {takeEvery} from 'redux-saga';

function* watch() {
    yield takeEvery(actionType.MENU.FETCH_MENU, saga.getMenu);
}

export default watch;