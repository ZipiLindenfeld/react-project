import axios from "axios"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actionType from "../store/actions"

export default () => {
    const getShoppingList = () => {
        axios.get(`http://localhost:8080/api/bay/${user}`)
            .then(data => {
                console.log(data.data)
                setShoppingList(data.data);
                // console.log("dfghjk", shoppingList.sort((a, b) => {

                //     let nameA = a.Name; // ignore case
                //     let nameB = b.Name; // ignore case

                //     if (nameA < nameB) {
                //         return -1;
                //     }
                //     if (nameA > nameB) {
                //         return 1;
                //     }

                //     // names must be equal
                //     return 0;
                // }));
                //setShoppingList([...shoppingList.sort((a, b) => a.Name - b.Name)]);
            })
            .catch(() => {
                console.log("dfgh")
            })

        //dispatch({ type: actionType.GET_SHOPPING_LIST })
    }
    const editProduct = (product, newProduct) => {
        if (product.Count + newProduct.Count == 0)
            axios.post(`http://localhost:8080/api/bay/delete/${product.Id}`)
                .then(() => getShoppingList()).catch();
        else
            axios.post(`http://localhost:8080/api/bay`, newProduct).then(() => {
                getShoppingList();
            }).catch(() => alert("העדכון נכשל בהכנסה"));
    }

    const { user } = useSelector(state => ({
        user: state.userId
    }));
    let newProduct;
    //const shoppingList = useSelector(state => state.shoppingList)
    const dispatch = useDispatch();
    const [shoppingList, setShoppingList] = useState([]);
    useEffect(() => {
        getShoppingList();
    }, [])
    console.log(shoppingList)
    //console.log("bnm",state.shoppingList);

    return (<div>
        {shoppingList.map((product) =>
            <div>
                <button onClick={() => {
                    newProduct = { ...product };
                    newProduct.Count = 1;
                    editProduct(product, newProduct);
                }}>+</button>
                <button onClick={() => {
                    newProduct = { ...product };
                    newProduct.Count = -1;
                    editProduct(product, newProduct);
                    if (product.Count + newProduct.Count == 0 && shoppingList.length == 1)
                        setShoppingList([]);
                }}>-</button>
                {product.Count}
                {product.Name}
            </div>
        )}
    </div>)
}