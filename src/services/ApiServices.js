//Appel de la vase url et type de données depuis http-common.js
import http from "../http-common"

//Constante de crud a appelé dans chaque fichier concerné

const getAllProduct = () => {
    //Appel de axios et ses methode HTTP REST
    return http.get("/products");
}

//Appel par id = on passe un paramètre et on appel une variable avec les
//guillement AltGr + 7 pour ajouter des $ et {paramètres}
const getProductById = id =>{
    return http.get(`/products/${id}`);
}

//Ajouter un produits
const createProduct = data => {
    return http.post("/products", data);
}

//Mettre a jour un produit = ici HTTP REST : put ou patch
const updateProduct = (id, data) => {
    return http.put(`/products/${id}`, data);
}

//Supprimer un produit
const removeOneProduct = id =>{
    return http.delete(`/products/${id}`);
}

//Supprimer tous les produits
const removeAllProducts = () => {
    return http.delete(`/products`);
}

//Recherche par nom du produit
const findProductByName = name_product => {
    return http.get(`/products?name_product={$name_product}`);
}
//Export de toutes les methodes utilisable dans les fichiers concernés
export default {
    getAllProduct,
    getProductById,
    createProduct,
    updateProduct,
    removeOneProduct,
    removeAllProducts,
    findProductByName
}