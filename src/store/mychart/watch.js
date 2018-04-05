import * as saga from './saga';
import * as actionType from './action';
import {takeLatest} from 'redux-saga/effects';

function* watch() {
    yield takeLatest(actionType.MY_CHART.SUBMIT_PURCHASING, saga.submitPurchasing);
}

export default watch;