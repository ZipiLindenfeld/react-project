import axios from 'axios';
import * as actionType from "../store/actions"
import Swal from 'sweetalert2';

export const GetCategories = () => {
    return dispatch =>
        axios.get('http://localhost:8080/api/category')
            .then((x) => {
                dispatch({ type: actionType.SET_CATEGORY, data: x.data })
            })
            .catch((error) =>
                console.error(error)
            )
}

export const AddCategory = (category) => {
    return dispatch =>
        axios.post(`http://localhost:8080/api/category`, { Name: category })
            .then((x) => {
                dispatch({ type: actionType.ADD_CATEGORY, data: x.data })
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title:category + `נוסף בהצלחה לרשימת הקטגוריות`,
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch((error) => console.error(error))
}