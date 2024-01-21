import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { Link, Outlet, useLocation } from "react-router-dom"
import * as yup from "yup"
import axios from "axios"
import { useDispatch } from "react-redux"
import * as actionType from "../../store/actions"
import { useNavigate } from "react-router-dom"
import { Form, FormField, Button } from 'semantic-ui-react'
import { SignIn, SetUser } from "../../services/userService";


const schema = yup
    .object({
        Username: yup.string().required('שדה חובה'),
        Password: yup.string().required('שדה חובה').min(4, 'סיסמא חייבת להיות עם מינימום 4 תווים'),
        Name: yup.string().required('שדה חובה'),
        Phone: yup.string().required('שדה חובה').min(9, 'חובה להכניס מינימום 9 ספרות'),
        Email: yup.string().required('שדה חובה').email('נא להכניס כתובת מייל חוקית'),
        Tz: yup.string().required('שדה חובה').min(9, 'חובה להכניס 9 ספרות').max(9, 'חובה להכניס 9 ספרות'),
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
        defaultValues: {
            Username: state?.Username,
            Password: state?.Password,
        }
    })


    const onSubmit = (data) => {
        dispatch(SignIn(data, navigate))
    }


    return (
        <div id="signIn">
            <div id="container">
                <div id="signin_form" class="ui placeholder segment">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div class="ui one column very relaxed stackable grid">
                            <div class="column">
                                <div class="ui form">
                                    <div class="field">
                                        <label>שם משתמש:</label>
                                        <div class="ui left icon input">
                                            <input placeholder="הכנס שם משתמש"{...register("Username")} />
                                            <i class="user icon"></i>
                                        </div>
                                        {errors.Username && <p class="ui pointing red basic label">{errors.Username?.message}</p>}
                                    </div>
                                    <div class="field">
                                        <label>סיסמא:</label>
                                        <div class="ui left icon input">
                                            <input type="password" placeholder="הכנס סיסמא" {...register("Password")} />
                                            <i class="lock icon"></i>
                                        </div>
                                        {errors.Password && <p class="ui pointing red basic label">{errors.Password?.message}</p>}
                                    </div>
                                    <div class="field">
                                        <label>שם:</label>
                                        <div class="ui left icon input">
                                            <input placeholder="הכנס שם"{...register("Name")} />
                                            <i class="user icon"></i>
                                        </div>
                                        {errors.Name && <p class="ui pointing red basic label">{errors.Name?.message}</p>}
                                    </div>
                                    <div class="field">
                                        <label>טלפון:</label>
                                        <div class="ui left icon input">
                                            <input placeholder="הכנס טלפון" {...register("Phone")} />
                                            <i class="phone icon"></i>
                                        </div>
                                        {errors.Phone && <p class="ui pointing red basic label">{errors.Phone?.message}</p>}
                                    </div>
                                    <div class="field">
                                        <label>מייל:</label>
                                        <div class="ui left icon input">
                                            <input placeholder="הכנס מייל"{...register("Email")} />
                                            <i class="mail icon"></i>
                                        </div>
                                        {errors.Email && <p class="ui pointing red basic label">{errors.Email?.message}</p>}
                                    </div>
                                    <div class="field">
                                        <label>מספר תעודת זהות:</label>
                                        <div class="ui left icon input">
                                            <input placeholder="הכנס מספר תעודת זהות" {...register("Tz")} />
                                            <i class="lock icon"></i>
                                        </div>
                                        {errors.Tz && <p class="ui pointing red basic label">{errors.Tz?.message}</p>}
                                    </div>
                                    <Button class="ui blue submit button" type="submit">הרשמה</Button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}