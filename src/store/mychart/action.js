import axios from '../../axios-config';

export const MY_CHART = {
    ADD_SINGLE_MENU: 'ADD_SINGLE_MENU',
    ADD_CUSTOM_BURGER: 'ADD_CUSTOM_BURGER',
    REMOVE_SINGLE_MENU: 'REMOVE_SINGLE_MENU',
    INCREASE_MENU: 'INCREASE_MENU',
    DECREASE_MENU: 'DECREASE_MENU',
    LOADING_SUBMIT_MENU: 'LOADING_SUBMIT_MENU',
    SET_RESPONSE: 'SET_RESPONSE',
    RESET_STATE:'RESET_STATE'
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


const loadingSubmitMenu = () => {
    return {
        type: MY_CHART.LOADING_SUBMIT_MENU
    }
};

const setResponse = (object, message) => {
    return {
        type: MY_CHART.SET_RESPONSE,
        success: object,
        response: {
            status:object,
            message:message
        }
    }
};

export const resetState = () => {
    return {
        type: MY_CHART.RESET_STATE
    }
};

export const submitMenuToServer = (orderForm, myChart,token,userId) => {
    return dispatch => {

        dispatch(loadingSubmitMenu());

        const iOrderForm = [...orderForm];
        let formObject = [];
        for (let a = 0; a < iOrderForm.length; a++) {
            const object = iOrderForm[a];
            formObject.push('"' + object.id + '":"' + object.value + '"');
        }
        const stringObj = '{' + formObject.join(',') + '}';
        const formValueObject = JSON.parse(stringObj);
        const submitData = {
            id: new Date().getTime(),
            ...formValueObject,
            userId:userId,
            purchasingItem: myChart.purchasingItem,
            totalPayment: myChart.totalPayment
        }

        axios.post('/orders.json?auth='+token, submitData)
            .then(response => {
                dispatch(setResponse(true, null));
            }).catch(error => {
            dispatch(setResponse(false, 'failed to submit'));
        });
    }
};