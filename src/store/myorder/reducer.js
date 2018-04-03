import * as actionType from './actions';
import {utility} from '../../common/helper/utility';

const initializeState = {
    myOrder: [],
    inProcess:false,
    error:false
}

const reducer = (state = initializeState, action) => {
    switch (action.type) {
        case actionType.MY_ORDER.SET_MY_ORDER:
            const newState={
                myOrder:[...action.myOrder],
                error:false,
                inProcess:false
            };
            return utility(state,newState);
        case actionType.MY_ORDER.SET_MY_ORDER_ERROR:
            return utility(state,{error:true});
        case actionType.MY_ORDER.SET_MY_ORDER_IN_PROCESS:
            return utility(state,{inProcess:true});
        default:
            return state;
    }
}

export default reducer;