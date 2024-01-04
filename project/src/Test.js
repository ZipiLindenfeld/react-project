import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { Link, Outlet } from "react-router-dom"
import * as yup from "yup"


const schema = yup
    .object({
        name: yup.string().required(),
        phone: yup.string().required().min(10),
        email: yup.string().email().required(),
        tz: yup.string().min(9).max(9),
    })
    .required()


export default function App() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })
    const onSubmit = (data) => console.log(data);


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <br />
            <label>שם:</label>
            <br />
            <input placeholder="הכנס שם"{...register("name")} />
            <p>{errors.name?.message}</p>
            <label>טלפון:</label>
            <br />
            <input placeholder="הכנס טלפון" {...register("phone")} />
            <p>{errors.phone?.message}</p>
            <label>מייל:</label>
            <br />
            <input placeholder="הכנס מייל"{...register("email")} />
            <p>{errors.email?.message}</p>
            <label>מספר תעודת זהות:</label>
            <br />
            <input placeholder="הכנס מספר תעודת זהות" {...register("tz")} />
            <p>{errors.tz?.message}</p>
            <button type="submit">התחברות</button>
        </form>
    )
}