import {put} from 'redux-saga/effects';
import * as actionType from './actions';
import axios from '../../axios-config';

export function* getIngredients() {
    try {
        const response=yield axios.get('/ingredients.json');
         yield put(actionType.setIngredients(response.data));
    } catch (error){
        yield put(actionType.setError(error.response.data.error.message));
    }
}
