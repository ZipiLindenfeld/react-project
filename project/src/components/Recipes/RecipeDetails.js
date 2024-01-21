import '../../styles/Recipes.css'
import { useLocation } from "react-router";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { editProduct } from "../../services/shoppingListService";
import { deleteRecipe } from "../../services/recipesService"
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
                <div id="recipe_title">
                    <h2>{recipe?.Name}</h2>
                </div>
                <h5>{recipe?.Description}</h5>
                <img src={recipe?.Img} style={{ width: '380px', height: '18rem' }} />
                <br />
                {recipe?.Ingrident.length > 0 &&
                    <div>
                        <h2>מוצרים</h2>
                        {recipe?.Ingrident.map((x) =>
                            <div id="product">
                                <button onClick={() => {
                                    dispatch(editProduct({ Count: 1, UserId: user, Name: x.Name }))
                                    Swal.fire({
                                        position: "center",
                                        icon: "success",
                                        title: "!המוצר נוסף בהצלחה לרשימת הקניות",
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                }}>
                                    <i class="cart icon"></i>
                                </button>
                                <div id="product_detailes">{x.Count} {x.Type} {x.Name}</div>
                            </div>)}
                    </div>
                }
                {recipe.Instructions.length > 0 && <div>
                    <h2>הוראות</h2>
                    {recipe?.Instructions.map((x) => <ul><li>{x}</li></ul>)}
                </div>}
                {user == recipe?.UserId &&
                    <div id="icons">
                        <button class="but" onClick={() => {
                            navigate("/AddRecipe", { state: recipe });
                        }}>עריכה
                            <i class="edit icon"></i>
                        </button>
                        <button class="but" onClick={() => {
                            dispatch(deleteRecipe(recipe.Id));
                            navigate("/Recipes");
                        }}>
                            <label>מחיקה</label>
                            <i class="trash icon"></i>
                        </button>
                    </div>
                }
            </div >
        </div>
    </div>
}