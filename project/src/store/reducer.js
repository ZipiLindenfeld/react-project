import axios from "axios";
import * as actionType from "./actions"
export const initialState = {
    userId: null,
    recipes: [],
    selected: null,
    shoppingList: [],
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.GET_RECIPES: return { ...state, recipes: action.recipes, selected: null, recipes: null };
        case actionType.LOG_OUT: return { ...state, userId: null, selected: null, recipes: null };
        case actionType.LOG_IN: return { ...state, userId: action.userId };
        case actionType.SET_SELECTED: return { ...state, selected: action.selected };
        case actionType.ADD_RECIPE:
            axios.post(`http://localhost:8080/api/recipe/`, action.add)
                .then(() => {
                    alert("המתכון נוסף בהצלחה!");
                    //axios.get(`http://localhost:8080/api/recipe`).then((y) => x = y);
                })
                .catch(() => alert("ההוספה נכשלה"));
            return { ...state, recipes: [...state.recipes, action.add] }
        case actionType.DELETE_RECIPE:
            axios.post(`http://localhost:8080/api/recipe/delete/${action.id}`)
                .then(() => {
                    alert("המתכון נמחק בהצלחה!");
                })
                .catch(() => alert("המחיקה נכשלה"));
            return { ...state }
        case actionType.EDIT_RECIPE:
            axios.post(`http://localhost:8080/api/recipe/edit`, action.recipe)
                .then(() => {
                    alert("המתכון עודכן בהצלחה!");
                    //axios.get(`http://localhost:8080/api/recipe`).then((y) => x = y);
                })
                .catch((res) => alert("העדכון נכשל"));
            return { ...state }
        case actionType.GET_SHOPPING_LIST:
            //console.log(state.userId);
            axios.get(`http://localhost:8080/api/bay/${state.userId}`)
                .then(data => {
                    console.log(state.shoppingList)
                    state.shoppingList = [...data.data];
                })
                .catch(() => {
                    console.log("dfgh")
                })
            return { ...state }
        default: return { ...state }
    }
}
export default reducer;