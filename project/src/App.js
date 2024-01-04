import './App.css';
import LogIn from "./components/LogIn";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import About from "./components/About";
import HomePage from "./components/HomePage";
import RecipeDetails from "./components/RecipeDetails";
import SignUp from "./components/SignUp";
import ShoppingList from "./components/ShoppingList"
import Recipes from "./components/Recipes"
import SignIn from "./components/SignIn";
import { useSelector } from "react-redux"
import Error from './components/Error';
import AddRecipe from "./components/AddRecipe"



function App() {
  const { userId } = useSelector(state => ({
    user: state.userId
  }));
  return (
    <body>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/About" element={<About />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/LogIn" element={<LogIn />} />
        <Route path="SignIn" element={<SignIn />} />
        <Route path="/RecipeDetails" element={<RecipeDetails />} />
        <Route path="/AddRecipe" element={<AddRecipe />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Recipes" element={<Recipes />} >
          <Route path="RecipeDetails" element={<RecipeDetails />}></Route>
        </Route>
        <Route path="/ShoppingList" element={<ShoppingList userId={userId} />} />
        <Route path="/*" element={<Error />} />
      </Routes>
    </body >)
}

export default App;
