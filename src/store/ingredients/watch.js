import * as saga from './saga';
import * as actionType from './actions';
import {takeEvery} from 'redux-saga/effects';

function* watch() {
    yield takeEvery(actionType.INGREDIENTS.FETCH_INGREDIENTS, saga.getIngredients);
}

export default watch;