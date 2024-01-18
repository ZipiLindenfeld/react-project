import '../styles/Recipes.css'
import { useLocation } from "react-router";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from 'axios';
import { Button } from "semantic-ui-react";
import { editProduct } from "../services/shoppingListService";
import { getRecipes, addRecipe, editRecipe, deleteRecipe } from "../services/recipesService"
import Swal from 'sweetalert2';

export default () => {
    const { state } = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector(state => ({
        user: state.user.user,
    }));
    let recipe = state;
    return <div>
        <div id="show_recipe">
            <div class="recipe">
                <h2>{recipe?.Name}</h2>
                <h5>{recipe?.Description}</h5>
                <img src={recipe?.Img} style={{ width: '380px', height: '18rem' }} />
                <br />
                {recipe?.Ingrident.length > 0 &&
                    <div>
                        <h2>מוצרים</h2>
                        {recipe?.Ingrident.map((x) => <p class="a"><button class="but b" onClick={() => {
                            dispatch(editProduct({ Count: 1, UserId: user, Name: x.Name }))
                            Swal.fire({
                                position: "center",
                                icon: "success",
                                title: "!המוצר נוסף בהצלחה לרשימת הקניות",
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }}>+</button>{x.Count} {x.Type} {x.Name}
                        </p>)}
                    </div>
                }
                {recipe.Instructions.length > 0 && <div>
                    <h2>הוראות</h2>
                    {recipe?.Instructions.map((x) => <ul><li>{x}</li></ul>)}
                </div>}
                {user == recipe?.UserId &&
                    <><button class="but" onClick={() => {
                        navigate("/AddRecipe", { state: recipe });
                    }}>עריכה</button>
                        <button class="but" onClick={() => {
                            dispatch(deleteRecipe(recipe.Id));
                            navigate("/Recipes");
                        }}>מחיקה</button></>
                }
            </div >
        </div>
    </div>
}