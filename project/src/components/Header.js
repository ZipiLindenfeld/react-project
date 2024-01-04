import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import a from "./KK_0684.jpg"

const App = () => {
    const navigate = useNavigate();
    const { user } = useSelector(state => ({
        user: state.userId
    }));
    return <div>

        {user ? <button class="button" onClick={() => { navigate("/SignUp"); alert("תודה שהייתם אתנו,  נשמח לראות אתכם שוב!"); }}>התנתקות</button> : <div><button class="button" onClick={() => navigate("/SignIn")}>הרשמה</button><button class="button" onClick={() => navigate("/LogIn")}>התחברות</button></div>}
        {user && <button class="button" onClick={() => navigate("/HomePage")}>לדף הבית</button>}
        {user && <button class="button" onClick={() => navigate("/ShoppingList")}>רשימת הקניות</button>}
        {user && <button class="button" onClick={() => navigate("/Recipes")}>רשימת מתכונים</button>}
        {!user && <button class="button" onClick={() => navigate("/About")}>אודות</button>}
        {user && <button class="button" onClick={() => navigate("/Recipes", { state: user })}>המתכונים שלי</button>}
        {user && <button class="button" onClick={() => navigate("/AddRecipe")}>הוספת מתכון</button>}

    </div>
}

export default App;