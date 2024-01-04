import axios from "axios"
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../styles/Recipes.css";
import * as actionType from "../store/actions"
import { Link, Outlet, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import GetDate from "./ShoppingList"

export default function App() {
    const editProduct = (newProduct) => {
        axios.post(`http://localhost:8080/api/bay`, newProduct).then(() => {
        }).catch(() => alert("העדכון נכשל בהכנסה"));
    }
    const { user, selected } = useSelector(state => ({
        user: state.userId,
        selected: state.selected,
    }));
    const { state } = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [recipes, setRecipes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState(0);
    const [duration, setDuration] = useState(50);
    const [difficulty, setDifficulty] = useState("0");
    const printRecipes = (recipe) => {
        return <div class="recipy">
            <h2>{recipe.Name}</h2>
            <h5>{recipe.Description}</h5>
            <img src={recipe.Img} style={{ width: '380px', height: '18rem' }} />
            <br />
            <div>
                {recipe.Ingrident.map((x) => <p class="a"><button class="but b" onClick={() => {
                    alert(`${x.Name} נוסף לעגלה`)
                    editProduct({ Count: 1, UserId: user, Name: x.Name })



                }}>+</button>{x.Count} {x.Type} {x.Name}</p>)}
            </div>
            <div>{recipe.Instructions.map((x) => <ul><li>{x}</li></ul>)}</div>
            {/* <button class="but">מוצרים</button>
            <button class="but">מתכון</button> */}
            {/* <button class="but" onClick={() => { navigate("RecipeDetails", { state: recipe }); }}>מתכון</button> */}
            {user == recipe.UserId &&
                <><button class="but" onClick={() => {
                    alert(recipe.Id);
                    navigate("/AddRecipe", { state: recipe });
                }}>עריכה</button>
                    <button class="but" onClick={() => {
                        dispatch({ type: actionType.DELETE_RECIPE, id: recipe.Id })
                    }}>מחיקה</button></>
            }

        </div >
    }
    useEffect(() => {
        axios.get("http://localhost:8080/api/recipe").then((x) => {
            setRecipes(x.data)
        })
        axios.get("http://localhost:8080/api/category").then((x) => {
            setCategories(x.data)
        })
        dispatch({ type: actionType.SET_SELECTED, selected: { category: category, duration: duration, difficulty: difficulty } });
    }, [category, difficulty, duration])
    return <>
        <br />
        קטגוריה:
        <br />
        <select id="categories" onChange={event => {
            setCategory(event.target.value);
        }}>קטגוריה
            <option value="0">הכל</option>
            {categories.map((x) =>
                <option value={x.Id}>{x.Name}</option>)
            }
        </select>
        <br />
        <br />
        דרגת קושי:
        <br />
        <select id="difficulty" onChange={event => {
            setDifficulty(event.target.value);
        }}>
            <option value="0">הכל</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
        </select >
        <p id="duration">משך זמן הכנה:{duration} דקות.
            <br />
            <input type="range" min="10" max="120" class="slider" onChange={({ target }) => {
                setDuration(target.value);
            }} />
        </p>
        <h1 id="recipes">מתכונים</h1>
        {!state ? recipes.map((recipe) =>
            (selected == null || (selected.category == "0" || selected.category == recipe.CategoryId) && selected.duration >= recipe.Duration && (selected.difficulty == recipe.Difficulty || selected.difficulty == "0"))
            && printRecipes(recipe, user)
        ) : recipes.map((recipe) =>
            state == recipe.UserId && (selected == null || (selected.category == "0" || selected.category == recipe.CategoryId) && selected.duration >= recipe.Duration && (selected.difficulty == recipe.Difficulty || selected.difficulty == "0"))
            && printRecipes(recipe, user))}
    </>
}


