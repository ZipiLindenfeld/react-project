import axios from "axios";
import * as actionType from "../store/actions";
import Swal from 'sweetalert2';

export const SetUser = (data, navigate) => {
    console.log(data);
    return dispatch => {
        axios.post('http://localhost:8080/api/user/login', data)
            .then((d) => {
                dispatch({ type: actionType.SET_USER, user: d.data.Id })
                Swal.fire({
                    position: "center",
                    icon: "success",
                    timer: 2000,
                    title: d.data.Name + "שלום ל",
                    showConfirmButton: false,
                });
                navigate("/HomePage")
            }).catch((error) => {
                Swal.fire({
                    position: "center",
                    icon: "warning",
                    title: error.response.data,
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate("/SignIn", { state: data })
            })
    }
}





export const LogOut = (navigate) => {
    return dispatch => {
        Swal.fire({
            title: "???להתנתק",
            text: "!אתה הולך לצאת מהאתר",
            icon: "warning",
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "!כן,התנתק",
            cancelButtonText: "לא,חזור לאתר"
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch({ type: actionType.LOG_OUT });
                Swal.fire({
                    showConfirmButton: false,
                    title: ":)תודה שהייתם אתנו",
                    text: "נשמח לראותכם שוב!!!",
                    icon: "success",
                    timer: 2000,
                });
                navigate("/HomePage")
            }
        });
    }

}

export const SignIn = (data, navigate) => {
    return dispatch => {
        axios.post("http://localhost:8080/api/user/sighin", data).then((d) => {
            dispatch({ type: actionType.SET_USER, user: d.data.Id })
            Swal.fire({
                position: "center",
                icon: "success",
                timer: 2000,
                title: d.data.Name + "שלום ל",
                showConfirmButton: false,
            });
            navigate("/HomePage")
        }).catch((error) => {
            Swal.fire({
                position: "center",
                icon: "warning",
                title: error.response.data,
                showConfirmButton: false,
                timer: 1500
            });
            navigate("/SignIn", { state: data })
        })
    }

}
