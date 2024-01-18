import axios from "axios"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getShoppingList, editProduct, deleteProduct } from "../services/shoppingListService";
import { Button } from "semantic-ui-react";

export default () => {
    let newProduct;
    const { user, shoppingList } = useSelector(state => ({
        user: state.user.user,
        shoppingList: state.shoppingList.shoppingList,
    }));
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getShoppingList(user));
    }, [])

    return (<div id="shopping_list_page">
        <Button onClick={() => {
            window.print();
        }}>להדפסה</Button>
        <h1 class="ui horizontal divider header">
            רשימת קניות
        </h1>
        <div class="ui raised segments">
            {shoppingList?.map((product) =>
                <div id="row_in_shoppingList" class="ui segment">
                    <div>
                        <Button onClick={() => {
                            newProduct = { ...product };
                            newProduct.Count = 1;
                            dispatch(editProduct(newProduct));
                        }}>
                            <i class="plus icon"></i>
                        </Button>
                        <Button onClick={() => {
                            newProduct = { ...product };
                            newProduct.Count = -1;
                            dispatch(editProduct(newProduct));
                            if ((product.Count + newProduct.Count) == 0) {
                                dispatch(deleteProduct(product));
                            }

                        }}>
                            <i class="minus icon"></i>
                        </Button>
                    </div>
                    <div>
                        <h4>
                            {product.Count}
                        </h4>
                    </div>
                    <div>
                        <h4>
                            {product.Name}
                        </h4>
                    </div>
                    <div>
                        <Button onClick={() => {
                            dispatch(deleteProduct(product));
                        }}>
                            <i class="trash icon"></i>
                        </Button>
                    </div>
                </div>
            )}
        </div>
        {/* <div class="ui orange segment">Orange</div>
        <div class="ui yellow segment">Yellow</div>
        <div class="ui olive segment">Olive</div>
        <div class="ui green segment">Green</div>
        <div class="ui teal segment">Teal</div>
        <div class="ui blue segment">Blue</div>
        <div class="ui violet segment">Violet</div>
        <div class="ui purple segment">Purple</div>
        <div class="ui pink segment">Pink</div>
        <div class="ui brown segment">Brown</div>
        <div class="ui grey segment">Grey</div>
        <div class="ui black segment">Black</div> */}
    </div>)
}