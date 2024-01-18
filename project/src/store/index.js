import { createStore, combineReducers, applyMiddleware } from 'redux';
//import { createStore, applyMiddleware, combineReducers } from 'redux';
import shoppingListReducer from './shoppingListReducer';
import { thunk } from 'redux-thunk'
import categoryReducer from './categoryReducer';
import userReducer from './userReducer';
import recipesReducer from './recipesReducer';

//export const store = createStore(reducer,applyMiddleware(thunk));
const reducers = combineReducers({
    shoppingList: shoppingListReducer,
    user: userReducer,
    categories: categoryReducer,
    recipes: recipesReducer,

})

export const store = createStore(reducers, applyMiddleware(thunk));
