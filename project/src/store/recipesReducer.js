import * as actionType from './actions'

const initalseState = {
    recipes: []
}

const recipesReducer = (state = initalseState, action) => {
    switch (action.type) {
        case actionType.SET_RECIPES:
            return { ...state, recipes: action.data }
        case actionType.ADD_RECIPE: {
            const recipes = [...state.recipes];
            recipes.push(action.data);
            return { ...state, recipes }
        }
        case actionType.EDIT_RECIPE: {
            const recipes = [...state.recipes];
            const findIndex = recipes.findIndex(x => x.Id === action.data.Id);
            recipes[findIndex] = action.data;
            return { ...state, recipes }
        }
        case actionType.DELETE_RECIPE: {
            const recipes = state.recipes.filter(x => x.Id != action.data)
            return { ...state, recipes }
        }
        default: return { ...state }
    }
}

export default recipesReducer;