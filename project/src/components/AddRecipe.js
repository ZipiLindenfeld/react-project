import { useForm, useFieldArray } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { Link, Outlet, useLocation } from "react-router-dom"
import * as yup from "yup"
import axios from "axios"
import { useDispatch } from "react-redux"
import * as actionType from "../store/actions"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
const schema = yup
    .object({
        //Id: yup.number().required(),
        Name: yup.string().required(),
        //UserId: yup.number(),
        CategoryId: yup.string().required(),
        Img: yup.string().required(),
        Duration: yup.string().required(),
        Difficulty: yup.string().required(),
        Description: yup.string().required(),
        Ingrident: yup.array().of(yup.object().shape({
            Name: yup.string().nullable(),
            count: yup.string().nullable(),
            Type: yup.string().nullable(),
        })),
        Instructions: yup.array(yup.string()),
    })
const Input = ({ register, errors, label, name, placeholder }) => {
    return <>
        <label>{label}</label><br />
        <input placeholder={placeholder} {...register({ name })} /><br />
        <p>{errors[name]?.message}</p>
    </>
}
export default function App() {
    const { state } = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState();
    useEffect(() => {
        axios.get("http://localhost:8080/api/category").then((x) => {
            setCategories(x.data)
        })
        //dispatch({ type: actionType.SET_SELECTED, selected: { category: category, duration: duration, difficulty: difficulty } });
    }, [category])
    const { user } = useSelector(state => ({
        user: state.userId
    }));

    const {
        register,
        handleSubmit,
        formState: { errors },
        control
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            Name: state?.Name,
            CategoryId: state?.CategoryId,
            Img: state?.Img,
            Duration: state?.Duration,
            Difficulty: state?.Difficulty,
            Description: state?.Description,
            Ingrident: state?.Ingrident,
            Instructions: state?.Instructions,
        },
    })


    const onSubmit = (data) => {
        const recipe = { UserId: user, ...data, Id: state?.Id };
        state != null && dispatch({ type: actionType.EDIT_RECIPE, recipe: recipe });
        state == null && dispatch({ type: actionType.ADD_RECIPE, add: recipe });
    }
    const { fields, append } = useFieldArray({
        control,
        name: "Ingrident",
    });
    const { fields: fieldsInstructions, append: appendInstructions, } = useFieldArray({
        control,
        name: "Instructions",
    });
    return <>
        <input type="text" name="category" onChange={(event) => {
            setCategory(event.target.value)
        }} />
        <button onClick={() => {
            alert(category);
            axios.post("http://localhost:8080/api/category",{Name:category} )
                .then((data) => {
                    alert(category + `נוספה לרשימת קטגוריה`)
                    setCategory(" ");
                }).catch((res) => {
                    alert(res)
                });
                
        }}>הוסף קטגוריה</button><br />
        <br />
        <form onSubmit={handleSubmit(onSubmit)}>
            <br />
            <label>שם העוגה</label>
            <br />
            <input placeholder="הכנס את שם העוגה"{...register("Name")} />
            <p>{errors.Name?.message}</p>
            <label>קטגוריה</label>
            <br />
            {/* onChange={event => { setCategory(event.target.value);}} */}
            <select id="categories" {...register("CategoryId")} >קטגוריה
                {categories.map((x) =>
                    <option value={x.Id}>{x.Name}</option>)
                }
            </select>
            <br />
            <label>תמונה</label>
            <input type="text" placeholder="הכנס קישור לתמונה" {...register("Img")} />
            <p>{errors.Img?.message}</p>
            <label> משך זמן הכנה בדקות::</label>
            <br />
            <input type="text" placeholder="הכנס זמן בדקות" {...register("Duration")} />
            <p>{errors.Duration?.message}</p>
            <label>רמת קושי:</label>
            <br />
            <select id="difficulty" {...register("Difficulty")}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select >
            <p>{errors.Difficulty?.message}</p>
            <br />
            <label>תיאור העוגה</label>
            <br />
            <input placeholder="הכנס תיאור על העוגה" {...register("Description")} />
            {/* <button onClick={() => {
            setProduct([...products, { Name: "", Count: 0, Type: "" }])
        }}>הוסף מוצר</button> */}
            {/* {products.map((x, i) =>
            <div>
                <br />
                <label>שם המוצר</label>
                <br />
                <input type="text" placeholder="הכנס את שם המוצר" onChange={(event) => { products[i].Name = event.target.value }} />
                <br />
                <label>כמות</label>
                <br />
                <input type="text" placeholder="הכנס כמות" onChange={(event) => { products[i].Count = event.target.value }} />
                <br />
                <label>סוג</label>
                <br />
                <input type="text" placeholder="הכנס סוג" onChange={(event) => { products[i].Type = event.target.value }} />
            </div>)
        } */}
            {fields.map((x, i) =>
                <div>
                    <label>שם מוצר:</label><br />
                    <input placeholder="הכנס שם מוצר" {...register(`Ingrident[${i}].Name`)} /><br />
                    <p></p>
                    <label>כמות:</label><br />
                    <input placeholder="הכנס כמות" {...register(`Ingrident[${i}].Count`)} /><br />
                    <label>סוג:</label><br />
                    <input placeholder="הכנס סוג" {...register(`Ingrident[${i}].Type`)} /><br /> </div>
            )} <button onClick={(e) => {
                e.preventDefault();
                append({})
            }}>הוספת מוצר</button>
            {fieldsInstructions.map((x, i) =>
                <div>
                    <label>הוראה {i + 1}:</label>
                    <input placeholder="הכנס הוראה" {...register(`Instructions[${i}]`)} />

                </div>
            )} <button onClick={(e) => {
                e.preventDefault();
                appendInstructions({})
            }
            }>הוספת הוראה  </button>
            <br />
            {/* <button onClick={() => {
            setInstructions([...instructions, ""])
        }}>הוסף הוראה</button>
        {instructions.map((x, i) =>
            <div>
                <br />
                <label>הוראה {i + 1}:</label>
                <input type="text" placeholder="הכנס הוראה" onChange={(event) => { instructions[i] = event.target.value }} />
            </div>)
        } */}

            <input type="submit" placeholder="שמירת המתכון" />

        </form></>
}