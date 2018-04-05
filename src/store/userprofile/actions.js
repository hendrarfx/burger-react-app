export const ACTION = {
    SET_USER_PROFILE: 'SET_USER_PROFILE',
    SET_USER_PROFILE_ERROR: 'SET_USER_PROFILE_ERROR',
    SET_USER_PROFILE_IN_PROCESS: 'SET_USER_PROFILE_IN_PROCESS',
    FETCH_SINGLE_USER_PROFILE: 'FETCH_SINGLE_USER_PROFILE'
};

export const setUserProfile = (object) => {
    return {
        type: ACTION.SET_USER_PROFILE,
        userProfile: object
    }
};

export const setUserProfileInProcess = (object) => {
    return {
        type: ACTION.SET_USER_PROFILE_IN_PROCESS
    }
};

export const setError = (object) => {
    return {
        type: ACTION.SET_USER_PROFILE_ERROR,
    }
};

export const getUserProfileFromServer = (token, userId) => {
    return {
        type: ACTION.FETCH_SINGLE_USER_PROFILE,
        token: token,
        userId: userId
    }
};