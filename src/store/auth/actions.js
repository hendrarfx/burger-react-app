export const AUTH = {
    SET_USER: 'SET_USER',
    SET_AUTH_IN_PROCESS: 'SET_AUTH_IN_PROCESS',
    AUTH_FAIL: 'AUTH_FAIL',
    AUTH_SIGN_OUT: 'AUTH_SIGN_OUT',
    AUTH_INITIATE_SIGN_OUT:'AUTH_INITIATE_SIGN_OUT',
    AUTH_INITIATE_CHECK_OUT:'AUTH_INITIATE_CHECK_OUT',
    AUTH_TIME_OUT: 'AUTH_TIME_OUT',
    AUTH_RESET_ERROR: 'AUTH_RESET_ERROR',
    AUTH_REGISTER: 'AUTH_REGISTER',
    AUTH_LOGIN: 'AUTH_LOGIN',
    AUTH_CHECK_FROM_LOCAL_STORAGE:'AUTH_CHECK_FROM_LOCAL_STORAGE'
};

export const setUser = (object) => {
    return {
        type: AUTH.SET_USER,
        user: object
    }
};

export const setError = (value) => {
    return {
        type: AUTH.AUTH_FAIL,
        error: value
    }
};

export const setAuthInProcess = () => {
    return {
        type: AUTH.SET_AUTH_IN_PROCESS,
    }
};

export const logout = () => {
    return {
        type: AUTH.AUTH_INITIATE_SIGN_OUT
    };
};

export const logoutSuccess = () => {
    return {
        type: AUTH.AUTH_SIGN_OUT
    };
};

export const resetError = () => {
    return {
        type: AUTH.AUTH_RESET_ERROR
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return {
        type:AUTH.AUTH_INITIATE_CHECK_OUT,
        expirationTime:expirationTime
    };
};

export const registerUser = (user) => {
    return {
        type:AUTH.AUTH_REGISTER,
        user:user
    }
};

export const loginUser = (user) => {
    return {
        type:AUTH.AUTH_LOGIN,
        user:user
    }
};

export const checkStateFromLocalStorage = () => {
    return {
        type:AUTH.AUTH_CHECK_FROM_LOCAL_STORAGE
    }
};
