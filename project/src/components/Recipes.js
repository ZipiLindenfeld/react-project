import axios from "axios"
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../styles/Recipes.css";
import * as actionType from "../store/actions"
import {useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { GetCategories } from "../services/categoryService"
import { getRecipes } from "../services/recipesService"

export default function App() {
    const { user, recipes, categories } = useSelector(state => ({
        user: state.user.user,
        recipes: state.recipes.recipes,
        categories: state.categories.categories,
    }));
    const { state } = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    //const [recipes, setRecipes] = useState([]);
    //const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState(0);
    const [duration, setDuration] = useState(120);
    const [difficulty, setDifficulty] = useState("0");
    const printRecipes = (recipe) => {
        return <div id="recipe_image">
            <div class="Enlarged_image">
                <p class="title_img">{recipe.Name}</p>
                <img src={recipe.Img} class="Enlarged_image_img" />
            </div>
            <Button id="show_btn" onClick={() => {
                navigate("/RecipeDetails", { state: recipe })
            }
            }>לצפיה במתכון</Button>
        </div>
    }
    useEffect(() => {
        dispatch(getRecipes());
        dispatch(GetCategories())
        // dispatch({ type: actionType.SET_SELECTED, selected: { category: category, duration: duration, difficulty: difficulty } });
    }, [])
    // useEffect(() => {
    //     // axios.get("http://localhost:8080/api/recipe").then((x) => {
    //     //     setRecipes(x.data)
    //     // })
    //     // dispatch(GetCategories())
    //     // dispatch({ type: actionType.SET_SELECTED, selected: { category: category, duration: duration, difficulty: difficulty } });
    // }, [category, difficulty, duration])
    return <>
        <div id="select_options">
            <div class="select_option" id="category_select">
                קטגוריה:
                <br />
                <select id="categories" onChange={event => {
                    setCategory(event.target.value);
                }}>קטגוריה
                    <option value="0">הכל</option>

                    {categories?.map((x) =>
                        <option value={x.Id}>{x.Name}</option>)
                    }
                </select>
            </div>
            <div class="select_option" id="select_difficulty">
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
            </div>
            <div class="select_option" id="select_duration">
                <div id="duration">משך זמן הכנה:{duration} דקות.
                    <br />
                    <input type="range" min="10" max="120" class="slider" onChange={({ target }) => {
                        setDuration(target.value);
                    }} />
                </div>
            </div>
        </div>
        <div>
            <h1 id="recipes">מתכונים</h1>
        </div>
        <div id="allrecipes">
            {!state ? recipes.map((recipe) =>
                ((category == "0" || category == recipe.CategoryId) && duration >= recipe.Duration && (difficulty == recipe.Difficulty || difficulty == "0"))
                && printRecipes(recipe, user)
            ) : recipes.map((recipe) =>
                state == recipe.UserId && ((category == "0" || category == recipe.CategoryId) && duration >= recipe.Duration && (difficulty == recipe.Difficulty || difficulty == "0"))
                && printRecipes(recipe, user))}
        </div>
    </>
}


