import { useForm, useFieldArray } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useLocation } from "react-router-dom"
import * as yup from "yup"
import { useDispatch } from "react-redux"
import * as actionType from "../../store/actions"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useSelector } from "react-redux"
import { Button } from "semantic-ui-react"
import { AddCategory } from "../../services/categoryService"
import { editRecipe, addRecipe } from "../../services/recipesService"

const schema = yup
    .object({
        Name: yup.string().required('שדה חובה'),
        CategoryId: yup.string().required('שדה חובה'),
        Img: yup.string().required('שדה חובה'),
        Duration: yup.string().required('שדה חובה'),
        Difficulty: yup.string().required('שדה חובה'),
        Description: yup.string().required('שדה חובה'),
        Ingrident: yup.array().of(yup.object().shape({
            Name: yup.string().nullable(),
            count: yup.string().nullable(),
            Type: yup.string().nullable(),
        })),
        Instructions: yup.array(yup.string()),
    })
export default function App() {
    const { state } = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [category, setCategory] = useState();
    const { user, categories } = useSelector(state => ({
        user: state.user.user,
        categories: state.categories.categories,
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
        state == null && dispatch(addRecipe(recipe));
        state != null && dispatch(editRecipe(recipe));
        navigate("/Recipes");
    }
    const { fields, append } = useFieldArray({
        control,
        name: "Ingrident",
    });
    const { fields: fieldsInstructions, append: appendInstructions, } = useFieldArray({
        control,
        name: "Instructions",
    });
    return <div>
        <div id="form">
            <input placeholder="הכנס קטגוריה" type="text" name="category" onChange={(event) => {
                setCategory(event.target.value)
            }} />
            <Button onClick={() => {
                dispatch(AddCategory(category));
            }}>הוסף קטגוריה</Button>
        </div>
        <div id="addRecipe">
            <div id="container">
                <div id="add_recipe_form" class="ui placeholder segment">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div class="ui one column very relaxed stackable grid">
                            <div class="column">
                                <div class="ui form">
                                    <div class="field">
                                        <label>שם העוגה</label>
                                        <div class="ui left icon input">
                                            <input placeholder="הכנס את שם העוגה"{...register("Name")} />
                                            <i class="cake icon"></i>
                                        </div>
                                        {errors.Name && <p class="ui pointing red basic label">{errors.Name?.message}</p>}
                                    </div>
                                    <div class="field">
                                        <label>קטגוריה</label>
                                        <div class="ui left icon input">
                                            <select id="categories" {...register("CategoryId")} >קטגוריה
                                                {categories.map((x) =>
                                                    <option value={x.Id}>{x.Name}</option>)
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div class="field">
                                        <label>תמונה</label>
                                        <div class="ui left icon input">
                                            <input type="text" placeholder="הכנס קישור לתמונה" {...register("Img")} />
                                            <i class="image icon"></i>
                                        </div>
                                        {errors.Img && <p class="ui pointing red basic label">{errors.Img?.message}</p>}
                                    </div>
                                    <div class="field">
                                        <label> משך זמן הכנה בדקות</label>
                                        <div class="ui left icon input">
                                            <input type="text" placeholder="הכנס זמן בדקות" {...register("Duration")} />
                                        </div>
                                        {errors.Duration && <p class="ui pointing red basic label">{errors.Duration?.message}</p>}
                                    </div>
                                    <div class="field">
                                        <label>רמת קושי</label>
                                        <div class="ui left icon input">
                                            <select id="difficulty" {...register("Difficulty")}>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                            </select >
                                            <i class="image icon"></i>
                                        </div>
                                        {errors.Difficulty && <p class="ui pointing red basic label">{errors.Difficulty?.message}</p>}
                                    </div>
                                    <div class="field">
                                        <label>תיאור העוגה</label>
                                        <div class="ui left icon input">
                                            <input placeholder="הכנס תיאור על העוגה" {...register("Description")} />
                                            <i class="image icon"></i>
                                        </div>
                                        {errors.Description && <p class="ui pointing red basic label">{errors.Description?.message}</p>}
                                    </div>
                                    <div class="field">
                                        <h2>מוצרים</h2>
                                        {fields.map((x, i) =>
                                            <div class="field" id="card">
                                                <h3>מוצר {i + 1}:</h3>
                                                <div class="field">
                                                    <label>שם מוצר:</label>
                                                    <div class="ui left icon input">
                                                        <input placeholder="הכנס שם מוצר" {...register(`Ingrident[${i}].Name`)} />
                                                    </div>
                                                </div>
                                                <div class="field">
                                                    <label>כמות:</label>
                                                    <div class="ui left icon input">
                                                        <input placeholder="הכנס כמות" {...register(`Ingrident[${i}].Count`)} />
                                                    </div>
                                                </div>
                                                <div class="field">
                                                    <label>סוג:</label>
                                                    <div class="ui left icon input">
                                                        <input placeholder="הכנס סוג" {...register(`Ingrident[${i}].Type`)} />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        <Button onClick={(e) => {
                                            e.preventDefault();
                                            append({})
                                        }}>הוספת מוצר</Button>
                                    </div>
                                    <div id="card" class="field">
                                        <h2>הוראות</h2>
                                        {fieldsInstructions.map((x, i) =>
                                            <div class="field">
                                                <label>הוראה {i + 1}:</label>
                                                <div class="ui left icon input">
                                                    <input placeholder="הכנס הוראה" {...register(`Instructions[${i}]`)} />
                                                </div>
                                            </div>
                                        )}
                                        <Button onClick={(e) => {
                                            e.preventDefault();
                                            appendInstructions(" ")
                                        }
                                        }>הוספת הוראה  </Button>
                                    </div>
                                    <Button class="ui blue submit button" type="submit">שמירת המתכון</Button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
}