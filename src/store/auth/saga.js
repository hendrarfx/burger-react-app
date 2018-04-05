import {put} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import * as actionType from './actions';
import axios from '../../axios-config';
import axiosBasic from 'axios';
import * as userActionType from '../userprofile/actions';

export function* logout(action) {
    yield localStorage.removeItem('token');
    yield put(actionType.logoutSuccess());
}

export function* checkOutTimeOut(action) {
    yield delay(action.expirationTime);
    yield put(actionType.logoutSuccess());
}

export function* register(action) {
    yield put(actionType.setAuthInProcess());
    const url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAroKywAciXhZidGyhQv1_p8rDjEFaqYNc';
    const authData = {
        email: action.user.email,
        password: action.user.password,
        returnSecureToken: true
    };
    try {
        const response = yield axiosBasic.post(url, authData);
        try {
            const userObj = {
                ...action.user,
                userId: response.data.localId
            };
            yield axios.post('/user.json', userObj);
            const expires = yield (new Date().getTime() + (response.data.expiresIn * 1000));
            const object = {
                id: response.data.localId,
                token: response.data.idToken,
                expires: expires
            };
            yield localStorage.setItem('token', JSON.stringify(object));
            yield put(actionType.setUser(object));
            yield put(actionType.checkAuthTimeout(response.data.expiresIn * 1000));

            try {
                const queryParams = '?auth=' + object.token + '&orderBy="userId"&equalTo="' + object.id + '"';
                const responseUsr = yield axios.get('/user.json' + queryParams);
                const fetchedOrders = [];
                for (let key in responseUsr.data) {
                    fetchedOrders.push({
                        ...response.data[key]
                    });
                }
                yield put(userActionType.setUserProfile(fetchedOrders));
            } catch (error) {
                yield put(actionType.setError(error.response.data.error.message));
            }
        } catch (error) {
            yield put(actionType.setError(error.response.data.error.message));
        }
    } catch (error) {
        yield put(actionType.setError(error.response.data.error.message));
    }
}

export function* login(action) {
    yield put(actionType.setAuthInProcess());
    const url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAroKywAciXhZidGyhQv1_p8rDjEFaqYNc';
    const authData = {
        email: action.user.email,
        password: action.user.password,
        returnSecureToken: true
    };
    try {
        const response = yield axiosBasic.post(url, authData);
        try {
            const expires = yield (new Date().getTime() + (response.data.expiresIn * 1000));
            const object = {
                id: response.data.localId,
                token: response.data.idToken,
                expires: expires
            };
            const queryParams = '?auth=' + object.token + '&orderBy="userId"&equalTo="' + object.id + '"';
            const responseUsr = yield axios.get('/user.json' + queryParams);
            const fetchedOrders = [];
            for (let key in responseUsr.data) {
                fetchedOrders.push({
                    ...responseUsr.data[key]
                });
            }

            yield localStorage.setItem('token', JSON.stringify(object));
            yield put(actionType.setUser(object));
            yield put(actionType.checkAuthTimeout(response.data.expiresIn * 1000));
            yield put(userActionType.setUserProfile(fetchedOrders));
        } catch (error) {
            yield put(actionType.setError(error.response.data.error.message));
        }
    } catch (error) {
        yield put(actionType.setError(error.response.data.error.message));
    }
}

export function* checkAuthFromLocalStorage() {
    const tokens = yield localStorage.getItem('token');
    if (tokens !== undefined && tokens !== null && tokens !== '') {
        const objToken = JSON.parse(tokens);
        const now = new Date().getTime();
        const expires = objToken.expires - now;
        if (expires > 0) {
            yield put(actionType.setUser(objToken));
            yield put(actionType.checkAuthTimeout(expires));

            const queryParams = '?auth=' + objToken.token + '&orderBy="userId"&equalTo="' + objToken.id + '"';
            try {
                const response = yield    axios.get('/user.json' + queryParams);
                const fetchedOrders = [];
                for (let key in response.data) {
                    fetchedOrders.push({
                        ...response.data[key]
                    });
                }
                yield put(userActionType.setUserProfile(fetchedOrders));
            } catch (error){
                yield put(actionType.setError(error.response.data.error.message));
            }
        } else {
            yield put(actionType.logout());
        }
    } else {
        yield put(actionType.logout());
    }
}