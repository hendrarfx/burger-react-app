import axios from '../../axios-config';

export const INGREDIENTS = {
    SET_INGREDIENTS: 'SET_INGREDIENTS',
    INGREDIENTS_FAIL: 'INGREDIENTS_FAIL'
};

const setIngredients = (object) => {
    return {
        type: INGREDIENTS.SET_INGREDIENTS,
        ingredients: object
    }
};

const setError = (object) => {
    return {
        type: INGREDIENTS.INGREDIENTS_FAIL,
        error: object
    }
};

export const getIngredientsFromServer = () => {
    return dispatch => {
        axios.get('/ingredients.json')
            .then(response => {
                dispatch(setIngredients(response.data));
            })
            .catch(error => {
                dispatch(setError(error));
            });
    }
};