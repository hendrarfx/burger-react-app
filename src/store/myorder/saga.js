import {put} from 'redux-saga/effects';
import * as actionType from './actions';
import axios from '../../axios-config';

export function* fetchOrder(action) {
    try {
        yield put (actionType.setMyOrderInProcess());
        const queryParams = '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"';
        const response = yield axios.get('/orders.json'+queryParams);
        const fetchedOrders = [];
        for ( let key in response.data ) {
            fetchedOrders.push( {
                ...response.data[key],
                orderId: key
            } );
        }
        yield put(actionType.setMyOrder(fetchedOrders));
    } catch (error) {
        yield put(actionType.setError(error.response.data.error.message));
    }
}
