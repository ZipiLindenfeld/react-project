import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getShoppingList, editProduct, deleteProduct } from "../../services/shoppingListService";
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

    return <div id="shopping_list_page">
        <Button onClick={() => {
            window.print();
        }}>להדפסה</Button>
        <div id="shoppingList_title" class="ui horizontal divider header">
            רשימת קניות
        </div>
        <div class="ui raised segments">
            {shoppingList?.map((product) =>
                <div id="row_in_shoppingList" class="ui segment">
                    <div id="product_count">
                        <Button onClick={() => {
                            newProduct = { ...product };
                            newProduct.Count = 1;
                            dispatch(editProduct(newProduct));
                        }}>
                            <i class="plus icon"></i>
                        </Button>
                        <div>
                            {product.Count}
                        </div>
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
                    <div id="product_name">
                        {product.Name}
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
    </div>
}