import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { Link, Outlet } from "react-router-dom"
import * as yup from "yup"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import * as actionType from "../store/actions"


const schema = yup
    .object({
        Username: yup.string().required(),
        Password: yup.string().required().min(3),
    })
    .required()


export default function App() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })
    const onSubmit = (data) => {
        console.log(data);
        let x;
        axios.post("http://localhost:8080/api/user/login", data).then((data) => {
            x = data.data;
            console.log(x);
            dispatch({ type: actionType.LOG_IN, userId: x.Id });
            navigate("/");
            alert("שלום ל" + x.Name);
        }).catch(() => {
            navigate("/SignIn", { state: data });
        });
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Link to="/SignIn">-אם אינך רשום לחץ להרשמה-</Link>
            <br />
            <br />
            <label>שם משתמש:</label>
            <br />
            <input placeholder="הכנס שם משתמש"{...register("Username")} />
            <p>{errors.Username?.message}</p>
            <label>סיסמא:</label>
            <br />
            <input type="password" placeholder="הכנס סיסמא" {...register("Password")} />
            <p>{errors.Password?.message}</p>
            <button type="submit">התחברות</button>
        </form>
    )
}