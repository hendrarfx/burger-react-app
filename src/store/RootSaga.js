import {all, fork} from 'redux-saga/effects';
import watchAuth from './auth/watch';
import watchIngredients from './ingredients/watch';
import watchMenu from './menu/watch';
import watchOrder from './myorder/watch';
import watchUserProfile from './userprofile/watch';
import watchMyChart from './mychart/watch';

export function* watchSaga() {
    yield all([
        fork(watchAuth),
        fork(watchIngredients),
        fork(watchMenu),
        fork(watchOrder),
        fork(watchOrder),
        fork(watchUserProfile),
        fork(watchMyChart)
    ]);
}