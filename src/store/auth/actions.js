import axios from '../../axios-config';
import axiosBasic from 'axios';
import * as userActionType from '../userprofile/actions';

export const AUTH = {
    SET_USER: 'SET_USER',
    SET_AUTH_IN_PROCESS: 'SET_AUTH_IN_PROCESS',
    AUTH_FAIL: 'AUTH_FAIL',
    AUTH_SIGN_OUT: 'AUTH_SIGN_OUT',
    AUTH_TIME_OUT: 'AUTH_TIME_OUT',
    AUTH_RESET_ERROR: 'AUTH_RESET_ERROR',
};

export const setUser = (object) => {
    return {
        type: AUTH.SET_USER,
        user: object
    }
};

const setError = (value) => {
    return {
        type: AUTH.AUTH_FAIL,
        error: value
    }
};

const setAuthInProcess = () => {
    return {
        type: AUTH.SET_AUTH_IN_PROCESS,
    }
};

export const logout = () => {
    localStorage.removeItem('token');
    return {
        type: AUTH.AUTH_SIGN_OUT
    };
};

export const timeout = () => {
    return {
        type: AUTH.AUTH_TIME_OUT
    };
};

export const resetError = () => {
    return {
        type: AUTH.AUTH_RESET_ERROR
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(timeout());
        }, expirationTime);
    };
};

export const registerUser = (user) => {
    return dispatch => {
        dispatch(setAuthInProcess());
        const url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAroKywAciXhZidGyhQv1_p8rDjEFaqYNc';
        const authData = {
            email: user.email,
            password: user.password,
            returnSecureToken: true
        };

        axiosBasic.post(url, authData)
            .then(response => {
                const userObj = {
                    ...user,
                    userId: response.data.localId
                };
                axios.post('/user.json', userObj)
                    .then(responseUser => {

                        const expires = new Date().getTime() + (response.data.expiresIn * 1000);

                        const object = {
                            id: response.data.localId,
                            token: response.data.idToken,
                            expires: expires
                        };
                        localStorage.setItem('token', JSON.stringify(object));
                        dispatch(setUser(object));
                        dispatch(checkAuthTimeout(response.data.expiresIn * 1000));
                        const queryParams = '?auth=' + object.token + '&orderBy="userId"&equalTo="' + object.id + '"';
                        axios.get('/user.json' + queryParams)
                            .then(response => {
                                const fetchedOrders = [];
                                for (let key in response.data) {
                                    fetchedOrders.push({
                                        ...response.data[key]
                                    });
                                }
                                dispatch(userActionType.setUserProfile(fetchedOrders));
                            })
                            .catch(error => {
                                dispatch(setError(error));
                            });
                    })
                    .catch(errorUser => {
                        dispatch(setError(errorUser.response.data.error.message));
                    });


            })
            .catch(error => {
                dispatch(setError(error.response.data.error.message));
            });
    }
};

export const loginUser = (user) => {
    return dispatch => {
        dispatch(setAuthInProcess());
        const url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAroKywAciXhZidGyhQv1_p8rDjEFaqYNc';
        const authData = {
            email: user.email,
            password: user.password,
            returnSecureToken: true
        };

        axiosBasic.post(url, authData)
            .then(response => {
                const expires = new Date().getTime() + (response.data.expiresIn * 1000);
                const object = {
                    id: response.data.localId,
                    token: response.data.idToken,
                    expires: expires
                };
                localStorage.setItem('token', JSON.stringify(object));
                dispatch(setUser(object));
                dispatch(checkAuthTimeout(response.data.expiresIn * 1000));

                const queryParams = '?auth=' + object.token + '&orderBy="userId"&equalTo="' + object.id + '"';
                axios.get('/user.json' + queryParams)
                    .then(response => {
                        const fetchedOrders = [];
                        for (let key in response.data) {
                            fetchedOrders.push({
                                ...response.data[key]
                            });
                        }
                        dispatch(userActionType.setUserProfile(fetchedOrders));
                    })
                    .catch(error => {
                        dispatch(setError(error));
                    });
            })
            .catch(error => {
                dispatch(setError(error.response.data.error.message));
            });
    }
};

export const checkStateFromLocalStorage = () => {
    return dispatch => {
        const tokens = localStorage.getItem('token');
        if (tokens !== undefined && tokens !== null && tokens !== '') {
            const objToken = JSON.parse(tokens);
            const now = new Date().getTime();
            const expires = objToken.expires - now;
            if (expires > 0) {
                dispatch(setUser(objToken));
                dispatch(checkAuthTimeout(expires));

                const queryParams = '?auth=' + objToken.token + '&orderBy="userId"&equalTo="' + objToken.id + '"';
                axios.get('/user.json' + queryParams)
                    .then(response => {
                        const fetchedOrders = [];
                        for (let key in response.data) {
                            fetchedOrders.push({
                                ...response.data[key]
                            });
                        }
                        dispatch(userActionType.setUserProfile(fetchedOrders));
                    })
                    .catch(error => {
                        dispatch(setError(error));
                    });

            } else {
                dispatch(logout());
            }
        } else {
            dispatch(logout());
        }
    }
}
