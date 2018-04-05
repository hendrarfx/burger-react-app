import {put} from 'redux-saga/effects';
import * as actionType from './actions';
import axios from '../../axios-config';

export function* getMenu() {
    try {
        const response=yield axios.get('/menu.json');
         yield put(actionType.setMenu(response.data));
    } catch (error){
        yield put(actionType.setError(error.response.data.error.message));
    }
}
