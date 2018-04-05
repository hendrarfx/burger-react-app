export const MY_CHART = {
    ADD_SINGLE_MENU: 'ADD_SINGLE_MENU',
    ADD_CUSTOM_BURGER: 'ADD_CUSTOM_BURGER',
    REMOVE_SINGLE_MENU: 'REMOVE_SINGLE_MENU',
    INCREASE_MENU: 'INCREASE_MENU',
    DECREASE_MENU: 'DECREASE_MENU',
    LOADING_SUBMIT_MENU: 'LOADING_SUBMIT_MENU',
    SET_RESPONSE: 'SET_RESPONSE',
    RESET_STATE: 'RESET_STATE',
    SUBMIT_PURCHASING: 'SUBMIT_PURCHASING'
};

export const addSingleMenu = (object) => {
    return {
        type: MY_CHART.ADD_SINGLE_MENU,
        menu: object
    }
};

export const addCustomBurger = (object) => {
    return {
        type: MY_CHART.ADD_CUSTOM_BURGER,
        customBurger: object
    }
};

export const removeSingleMenu = (id) => {
    return {
        type: MY_CHART.REMOVE_SINGLE_MENU,
        id: id
    }
};

export const increaseMenu = (id) => {
    return {
        type: MY_CHART.INCREASE_MENU,
        id: id
    }
};

export const decreaseMenu = (id) => {
    return {
        type: MY_CHART.DECREASE_MENU,
        id: id
    }
};


export const loadingSubmitMenu = () => {
    return {
        type: MY_CHART.LOADING_SUBMIT_MENU
    }
};

export const setResponse = (status, message) => {
    return {
        type: MY_CHART.SET_RESPONSE,
        success: status,
        response: {
            status: status,
            message: message
        }
    }
};

export const resetState = () => {
    return {
        type: MY_CHART.RESET_STATE
    }
};

export const submitMenuToServer = (formValue, myChart, token, userId) => {
    return {
        type: MY_CHART.SUBMIT_PURCHASING,
        formValue: formValue,
        myChart: myChart,
        token: token,
        userId: userId
    };
};