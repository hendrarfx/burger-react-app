import {put} from 'redux-saga/effects';
import * as actionType from './action';
import axios from '../../axios-config';

export function* submitPurchasing(action) {
    try {
        yield put(actionType.loadingSubmitMenu());

        const submitData = {
            id: new Date().getTime(),
            ...action.formValue,
            userId: action.userId,
            purchasingItem: action.myChart.purchasingItem,
            totalPayment: action.myChart.totalPayment
        };

        yield axios.post('/orders.json?auth=' + action.token, submitData)
        yield put(actionType.setResponse(true, 'submit success'));

    } catch (error) {
        yield put(actionType.setResponse(false, error.response.data.error.message));
    }
}
