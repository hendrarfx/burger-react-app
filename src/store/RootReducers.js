import menuReducers from './menu/reducer';
import ingredientsReducers from './ingredients/reducer';
import myChartReducers from './mychart/reducer';
import {combineReducers} from 'redux';
import myOrderReducers from './myorder/reducer';
import authReducer from './auth/reducer';
import userProfileReducer from './userprofile/reducer';

export const rootReducer = combineReducers({
        myChart: myChartReducers,
        menu: menuReducers,
        ingredients: ingredientsReducers,
        myOrder: myOrderReducers,
        auth: authReducer,
        userProfile:userProfileReducer
    }
);