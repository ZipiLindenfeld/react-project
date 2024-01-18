import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import 'semantic-ui-css/semantic.min.css'
import { Button, } from "semantic-ui-react";

const App = () => {
    const navigate = useNavigate();
    const { user } = useSelector(state => ({
        user: state.user.user
    }));
    return <div id="header_father">
        <div id="header">
            {user ? <Button id="button" onClick={() => { navigate("/LogOut"); }}>התנתקות</Button> : <><Button id="button" onClick={() => navigate("/SignIn")}>הרשמה</Button><Button id="button" onClick={() => navigate("/LogIn")}>התחברות</Button></>}
            {user && <Button id="button" onClick={() => navigate("/HomePage")}>לדף הבית</Button>}
            {user && <Button id="button" onClick={() => navigate("/ShoppingList")}>רשימת הקניות</Button>}
            {user && <Button id="button" onClick={() => navigate("/Recipes")}>רשימת מתכונים</Button>}
            {!user && <Button id="button" onClick={() => navigate("/About")}>אודות</Button>}
            {user && <Button id="button" onClick={() => navigate("/Recipes", { state: user })}>המתכונים שלי</Button>}
            {user && <Button id="button" onClick={() => navigate("/AddRecipe")}>הוספת מתכון</Button>}
        </div>
    </div>
}

export default App;