import * as actionType from './actions';
import {utility} from '../../common/helper/utility';

const initializeState = {
    data: {},
    inProcess:false,
    error:false
}

const reducer = (state = initializeState, action) => {
    switch (action.type) {
        case actionType.ACTION.SET_USER_PROFILE:
            let data ={};
            if(action.userProfile.length>0) data=action.userProfile[0];
            const newState={
                data:data,
                error:false,
                inProcess:false
            };
            return utility(state,newState);
        case actionType.ACTION.SET_USER_PROFILE_ERROR:
            return utility(state,{error:true});
        case actionType.ACTION.SET_USER_PROFILE_IN_PROCESS:
            return utility(state,{inProcess:true});
        default:
            return state;
    }
}

export default reducer;