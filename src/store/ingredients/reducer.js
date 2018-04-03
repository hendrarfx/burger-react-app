import * as actionType from './actions';
import {utility} from '../../common/helper/utility';

const initializeState = {
    ingredients: [],
    error:false
}

const reducer = (state = initializeState, action) => {
    switch (action.type) {
        case actionType.INGREDIENTS.SET_INGREDIENTS:
            const newState={
                ingredients:[...action.ingredients],
                error:false
            };
            return utility(state,newState);
        case actionType.INGREDIENTS.INGREDIENTS_FAIL:
            return utility(state,{error:true});
        default:
            return state;
    }
}

export default reducer;