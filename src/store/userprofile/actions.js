import axios from '../../axios-config';

export const ACTION = {
    SET_USER_PROFILE: 'SET_USER_PROFILE',
    SET_USER_PROFILE_ERROR: 'SET_USER_PROFILE_ERROR',
    SET_USER_PROFILE_IN_PROCESS: 'SET_USER_PROFILE_IN_PROCESS'
};

export const setUserProfile = (object) => {
    return {
        type: ACTION.SET_USER_PROFILE,
        userProfile: object
    }
};

const setUserProfileInProcess = (object) => {
    return {
        type: ACTION.SET_USER_PROFILE_IN_PROCESS
    }
};

const setError = (object) => {
    return {
        type: ACTION.SET_USER_PROFILE_ERROR,
    }
};

export const getUserProfileFromServer = (token,userId) => {
    return dispatch => {
        dispatch(setUserProfileInProcess());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('/user.json'+queryParams)
            .then(response => {
                const fetchedOrders = [];
                for ( let key in response.data ) {
                    fetchedOrders.push( {
                        ...response.data[key]
                    } );
                }
                dispatch(setUserProfile(fetchedOrders));
            })
            .catch(error => {
                dispatch(setError(error));
            });
    }
};