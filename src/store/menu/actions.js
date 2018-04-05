export const MENU = {
    SET_MENU: 'SET_MENU',
    SET_MENU_ERROR: 'SET_MENU_ERROR',
    FETCH_MENU: 'FETCH_MENU',
};

export const setMenu = (object) => {
    return {
        type: MENU.SET_MENU,
        menu: object
    }
};

export const setError = (object) => {
    return {
        type: MENU.SET_MENU_ERROR,
        error: object
    }
};

export const getMenuFromServer = () => {
    return {
        type: MENU.FETCH_MENU
    }
};