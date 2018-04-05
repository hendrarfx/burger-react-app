import {put} from 'redux-saga/effects';
import * as actionType from './actions';
import axios from '../../axios-config';

export function* fetchSingleUserProfile(action) {
    try {
        yield put(actionType.setUserProfileInProcess);
        const queryParams = '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"';
        const response = yield axios.get('/user.json' + queryParams);
        const fetchedOrders = [];
        for (let key in response.data) {
            fetchedOrders.push({
                ...response.data[key]
            });
        }
        yield put(actionType.setUserProfile(fetchedOrders));
    } catch (error) {
        yield put(actionType.setError(error.response.data.error.message));
    }
}
