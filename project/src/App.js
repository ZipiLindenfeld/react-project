import './App.css';
import LogIn from "./components/User/LogIn";
import Header from "./components/Other/Header";
import { Routes, Route } from "react-router-dom";
import About from "./components/Other/About";
import HomePage from "./components/Other/HomePage";
import RecipeDetails from "./components/Recipes/RecipeDetails";
import LogOut from "./components/User/LogOut";
import ShoppingList from "./components/Other/ShoppingList"
import Recipes from "./components/Recipes/Recipes"
import SignIn from "./components/User/SignIn";
import Error from './components/Other/Error';
import AddRecipe from "./components/Recipes/AddRecipe"

function App() {
  return <body id="body">
    <div id="body_content"><Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/About" element={<About />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/LogIn" element={<LogIn />} />
        <Route path="SignIn" element={<SignIn />} />
        <Route path="/AddRecipe" element={<AddRecipe />} />
        <Route path="/LogOut" element={<LogOut />} />
        <Route path="/RecipeDetails" element={<RecipeDetails />} />
        <Route path="/Recipes" element={<Recipes />} />
        <Route path="/ShoppingList" element={<ShoppingList />} />
        <Route path="/*" element={<Error />} />
      </Routes>
    </div>
  </body >
}

export default App;
