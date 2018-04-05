export const INGREDIENTS = {
    SET_INGREDIENTS: 'SET_INGREDIENTS',
    INGREDIENTS_FAIL: 'INGREDIENTS_FAIL',
    FETCH_INGREDIENTS:'FETCH_INGREDIENTS'
};

export const setIngredients = (object) => {
    return {
        type: INGREDIENTS.SET_INGREDIENTS,
        ingredients: object
    }
};

export const setError = (object) => {
    return {
        type: INGREDIENTS.INGREDIENTS_FAIL,
        error: object
    }
};

export const getIngredientsFromServer = () => {
    return {
        type:INGREDIENTS.FETCH_INGREDIENTS
    }
};