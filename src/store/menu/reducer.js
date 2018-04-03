import * as actionType from './actions';
import {utility} from '../../common/helper/utility';

const initializeState = {
    menu: [],
    error:false
}

const reducer = (state = initializeState, action) => {
    switch (action.type) {
        case actionType.MENU.SET_MENU:
            const newState={
                menu:[...action.menu],
                error:false
            };
            return utility(state,newState);
        case actionType.MENU.SET_MENU_ERROR:
            return utility(state,{error:true});
        default:
            return state;
    }
}

export default reducer;