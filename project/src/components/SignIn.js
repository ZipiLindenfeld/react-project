import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { Link, Outlet, useLocation } from "react-router-dom"
import * as yup from "yup"
import axios from "axios"
import { useDispatch } from "react-redux"
import * as actionType from "../store/actions"
import { useNavigate } from "react-router-dom"


const schema = yup
    .object({
        Username: yup.string().required(),
        Password: yup.string().required(),
        Name: yup.string().required(),
        Phone: yup.string().required().min(10),
        Email: yup.string().email().required(),
        Tz: yup.string().min(9).max(9),
    })
    .required()


export default function App() {
    const { state } = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
        axios.post("http://localhost:8080/api/user/sighin", data).then((data) => {
            x = data.data;
            console.log(x);
            dispatch({ type: actionType.LOG_IN, userId: x.Id });
            navigate("/");
            alert("שלום ל" + x.Name);
        }).catch(() => {
            alert("הינך כבר רשום במערכת");
            navigate("/LogIn");
        });
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <br />
            <label>שם משתמש:</label>
            <br />
            <input placeholder="הכנס שם משתמש"{...register("Username")} value={state?.Username} />
            <p>{errors.Username?.message}</p>
            <label>סיסמא:</label>
            <br />
            <input type="password" placeholder="הכנס סיסמא" {...register("Password")} value={state?.Password} />
            <p>{errors.Password?.message}</p>
            <label>שם:</label>
            <br />
            <input placeholder="הכנס שם"{...register("Name")} />
            <p>{errors.Name?.message}</p>
            <label>טלפון:</label>
            <br />
            <input placeholder="הכנס טלפון" {...register("Phone")} />
            <p>{errors.Phone?.message}</p>
            <label>מייל:</label>
            <br />
            <input placeholder="הכנס מייל"{...register("Email")} />
            <p>{errors.Email?.message}</p>
            <label>מספר תעודת זהות:</label>
            <br />
            <input placeholder="הכנס מספר תעודת זהות" {...register("Tz")} />
            <p>{errors.Tz?.message}</p>
            <button type="submit">התחברות</button>
        </form>
    )
}