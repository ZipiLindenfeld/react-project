import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { Link } from "react-router-dom"
import * as yup from "yup"
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { Button } from "semantic-ui-react"
import { SetUser } from "../../services/userService"

const schema = yup
    .object({
        Username: yup.string().required('שדה חובה'),
        Password: yup.string().required('שדה חובה').min(4, 'סיסמא חייבת להכיל לפחות 4 ספרות'),
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
        dispatch(SetUser(data, navigate))
    }
    return (
        <div>
            <div id="login">
                <div id="container">
                    <div id="login_form" class="ui placeholder segment">
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
                                        <Button class="ui blue submit button" type="submit">התחברות</Button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div id="p">
                <Link to="/SignIn">-אם אינך רשום לחץ להרשמה-</Link>
            </div>

        </div>
    )
}


