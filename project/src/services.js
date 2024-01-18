import axios from 'axios'

// Recipes
export const AddRecipe = (recipe) => {
    axios.post(`http://localhost:8080/api/recipe/`, recipe)
        .then(() => {
            alert("המתכון נוסף בהצלחה!");
        })
        .catch(() => alert("ההוספה נכשלה"));
}

export const EditRecipe = (recipe) => {
    axios.post(`http://localhost:8080/api/recipe/edit`, recipe)
        .then(() => {
            alert("המתכון עודכן בהצלחה!");
        })
        .catch((res) => alert("העדכון נכשל"));
}

export const DeleteRecipe = (id) => {
    axios.post(`http://localhost:8080/api/recipe/delete/${id}`)
        .then(() => {
            alert("המתכון נמחק בהצלחה!");
        })
        .catch(() => alert("המחיקה נכשלה"));
}
