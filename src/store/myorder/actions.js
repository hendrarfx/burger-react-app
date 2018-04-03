import axios from '../../axios-config';

export const MY_ORDER = {
    SET_MY_ORDER: 'SET_MY_ORDER',
    SET_MY_ORDER_ERROR: 'SET_MY_ORDER_ERROR',
    SET_MY_ORDER_IN_PROCESS: 'SET_MY_ORDER_IN_PROCESS'
};

const setMyOrder = (object) => {
    return {
        type: MY_ORDER.SET_MY_ORDER,
        myOrder: object
    }
};

const setMyOrderInProcess = (object) => {
    return {
        type: MY_ORDER.SET_MY_ORDER_IN_PROCESS
    }
};

const setError = (object) => {
    return {
        type: MY_ORDER.SET_MY_ORDER_ERROR,
        error: object
    }
};

export const getOrderFromServer = (token,userId) => {

    return dispatch => {
        dispatch(setMyOrderInProcess());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('/orders.json'+queryParams)
            .then(response => {
                const fetchedOrders = [];
                for ( let key in response.data ) {
                    fetchedOrders.push( {
                        ...response.data[key],
                        orderId: key
                    } );
                }

                dispatch(setMyOrder(fetchedOrders));
            })
            .catch(error => {

                dispatch(setError(error));
            });
    }
};