import axios from "axios";
import * as actionType from "../store/actions"

export const getRecipes = () => {
    return dispatch => {
        axios.get('http://localhost:8080/api/recipe')
            .then((res) =>
                dispatch({ type: actionType.SET_RECIPES, data: res.data }))
            .catch((error) =>
                console.error(error)
            )
    }
}
export const deleteRecipe = (x) => {
    return dispatch =>
        axios.post(`http://localhost:8080/api/recipe/delete/${x}`)
            .then(() => {
                dispatch({ type: actionType.DELETE_RECIPE, data: x })
            })
            .catch((error) => { console.error(error) })
}
export const addRecipe = (data, user) => {
    return dispatch => axios.post('http://localhost:8080/api/recipe', data)
        .then(() => {
            dispatch({ type: actionType.ADD_RECIPE, data: data })
        })
        .catch((error) => {
            console.error(error)
        })
}
export const editRecipe = (data, selectRecipe) => {
    return dispatch => axios.post('http://localhost:8080/api/recipe/edit', { ...data, UserId: selectRecipe?.UserId, Id: selectRecipe?.Id })
        .then((response) => {
            dispatch({ type: actionType.EDIT_RECIPE, data: response.data })
        })
        .catch((error) => { console.error(error) })
}