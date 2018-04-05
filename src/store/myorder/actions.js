export const MY_ORDER = {
    SET_MY_ORDER: 'SET_MY_ORDER',
    SET_MY_ORDER_ERROR: 'SET_MY_ORDER_ERROR',
    SET_MY_ORDER_IN_PROCESS: 'SET_MY_ORDER_IN_PROCESS',
    FETCH_ORDER:'FETCH_ORDER'
};

export const setMyOrder = (object) => {
    return {
        type: MY_ORDER.SET_MY_ORDER,
        myOrder: object
    }
};

export const setMyOrderInProcess = (object) => {
    return {
        type: MY_ORDER.SET_MY_ORDER_IN_PROCESS
    }
};

export const setError = (object) => {
    return {
        type: MY_ORDER.SET_MY_ORDER_ERROR,
        error: object
    }
};

export const getOrderFromServer = (token,userId) => {
    return {
        type:MY_ORDER.FETCH_ORDER,
        token:token,
        userId:userId
    }
};