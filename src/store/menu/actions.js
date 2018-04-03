import axios from '../../axios-config';

export const MENU = {
    SET_MENU: 'SET_MENU',
    SET_MENU_ERROR: 'SET_MENU_ERROR'
};

const setMenu = (object) => {
    return {
        type: MENU.SET_MENU,
        menu: object
    }
};

const setError = (object) => {
    return {
        type: MENU.SET_MENU_ERROR,
        error: object
    }
};

export const getMenuFromServer = () => {
    return dispatch => {
        axios.get('/menu.json')
            .then(response => {
                dispatch(setMenu(response.data));
            })
            .catch(error => {
                dispatch(setError(error));
            });
    }
};