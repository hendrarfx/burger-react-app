import * as actionType from './action';
import {utility} from '../../common/helper/utility';

const initializeState = {
    purchasingItem: [],
    totalItem: 0,
    totalPayment: 0,
    inProcessSubmit: false,
    response: {
        success: false,
        error: ''
    }
}

const reducer = (state = initializeState, action) => {

    switch (action.type) {
        case actionType.MY_CHART.ADD_SINGLE_MENU:
            return utility(state, addSingleMenu(state,action));
        case actionType.MY_CHART.ADD_CUSTOM_BURGER:
            return utility(state, addCustomBurger(state,action));
        case actionType.MY_CHART.REMOVE_SINGLE_MENU:
            return utility(state, removeSingleMenu(state,action));
        case actionType.MY_CHART.INCREASE_MENU:
            return utility(state, increaseMenu(state,action));
        case actionType.MY_CHART.DECREASE_MENU:
            return utility(state,decreaseMenu(state,action));
        case actionType.MY_CHART.LOADING_SUBMIT_MENU:
            return utility(state,{inProcessSubmit:true});
        case actionType.MY_CHART.SET_RESPONSE:
            return utility(state,{inProcessSubmit: false,response: action.response});
        case actionType.MY_CHART.RESET_STATE:
            return utility(state,initializeState);
        default:
            return {...state};
    }
}

const addCustomBurger = (state,action) => {
    const iPurchasingItem = [...state.purchasingItem];
    let price = 0;

    const selectedMenu = {
        id: new Date().getTime(),
        menuId: 'MN08',
        name: 'Custom Burger',
        price: action.customBurger.totalPayment,
        custom: true,
        customDetail: {
            order: action.customBurger.order,
            summary: action.customBurger.summaryPurchasing
        },
        total: 1
    };
    iPurchasingItem.push(selectedMenu);
    price = calculateTotalPrice(iPurchasingItem);
    return {
        purchasingItem: iPurchasingItem,
        totalItem: state.totalItem + 1,
        totalPayment: price
    };
}

const addSingleMenu = (state,action) => {
    const iPurchasingItem = [...state.purchasingItem];
    let selected = iPurchasingItem.find((data) => {
        return data.menuId === action.menu.id
    });
    if (selected !== undefined) {
        selected.total++;
    } else {
        const selectedMenu = {
            id: new Date().getTime(),
            menuId: action.menu.id,
            name: action.menu.name,
            price: action.menu.regularPrice,
            custom: false,
            customDetail: {},
            total: 1
        };
        iPurchasingItem.push(selectedMenu);
    }

    const newState = {
        purchasingItem: iPurchasingItem,
        totalItem: state.totalItem + 1,
        totalPayment: calculateTotalPrice(iPurchasingItem)
    };
    return newState;
}

const calculateTotalPrice = (purchasingItem) => {
    let total = 0;
    for (let a = 0; a < purchasingItem.length; a++) {
        const data = purchasingItem[a];
        total = total + (data.total * data.price);
    }
    return total;
}

const calculateTotalItem = (purchasingItem) => {
    let total = 0;
    for (let a = 0; a < purchasingItem.length; a++) {
        const data = purchasingItem[a];
        total = total + data.total;
    }
    return total;
}

const removeSingleMenu = (state,action) => {
    const iPurchasingItem = [...state.purchasingItem];
    let price = 0;
    let totalItem = 0;
    const purchasingItemAfterRemove = iPurchasingItem.filter((data) => {
        return data.id !== action.id;
    });

    price = calculateTotalPrice(purchasingItemAfterRemove);
    totalItem = calculateTotalItem(purchasingItemAfterRemove);
    return {
        purchasingItem: purchasingItemAfterRemove,
        totalItem: totalItem,
        totalPayment: price
    };
}

const decreaseMenu = (state,action) => {
    const iPurchasingItem = [...state.purchasingItem];
    let price = 0;
    let totalItem = 0;
    const purchasingForDecrease = iPurchasingItem.find((data) => {
        return data.id === action.id;
    });

    let purchasingAfterDecrease = [];
    purchasingForDecrease.total--;

    if (purchasingForDecrease.total <= 0) {
        purchasingForDecrease.total = 0;
        purchasingAfterDecrease = iPurchasingItem.filter((data) => {
            return data.id !== action.id;
        });
    } else {
        purchasingAfterDecrease = [...iPurchasingItem];
    }

    price = calculateTotalPrice(purchasingAfterDecrease);
    totalItem = calculateTotalItem(purchasingAfterDecrease);
    return {
        ...state,
        purchasingItem: purchasingAfterDecrease,
        totalItem: totalItem,
        totalPayment: price
    };
}

const increaseMenu = (state,action) => {
    const iPurchasingItem = [...state.purchasingItem];
    let price = 0;
    let totalItem = 0;

    const purchasingForIncrease = iPurchasingItem.find((data) => {
        return data.id === action.id;
    });

    purchasingForIncrease.total++;
    price = calculateTotalPrice(iPurchasingItem);
    totalItem = calculateTotalItem(iPurchasingItem);
    return {
        ...state,
        purchasingItem: iPurchasingItem,
        totalItem: totalItem,
        totalPayment: price
    };
}

export default reducer;