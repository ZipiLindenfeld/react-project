import axios from 'axios';
import * as actionType from "../store/actions"

export const getShoppingList = (user) => {
    return dispatch => axios.get(`http://localhost:8080/api/bay/${user}`)
        .then((x) => {
            dispatch({ type: actionType.SET_SHOPPING_LIST, data: x.data })
        })
        .catch((error) =>
            console.error(error)
        )
}

export const deleteProduct = (product) => {
    return dispatch => axios.post(`http://localhost:8080/api/bay/delete/${product.Id}`)
        .then(() => {
            dispatch({ type: actionType.DELETE_PRODUCT, data: product.Id })
        })
        .catch((error) => {
            console.error(error)
        })
}

export const editProduct = (product) => {
    return dispatch => {
        axios.post(`http://localhost:8080/api/bay`, product)
            .then(() => {
                dispatch({ type: actionType.EDIT_PRODUCT, data: product })
            }).catch((error) => console.error(error))
    }
}
