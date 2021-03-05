//Appel de la vase url et type de données depuis http-common.js
import http from "../http-common"

//Constante de crud a appelé dans chaque fichier concerné

const getAllUsers = () => {
    //Appel de axios et ses methode HTTP REST
    return http.get("/users");
}

//Appel par id = on passe un paramètre et on appel une variable avec les
//guillement AltGr + 7 pour ajouter des $ et {paramètres}
const getUSersById = id =>{
    return http.get(`/users/${id}`);
}

//Ajouter un produits
const createUsers = data => {
    return http.post("/users", data);
}

//Mettre a jour un produit = ici HTTP REST : put ou patch
const updateUsers = (id, data) => {
    return http.put(`/users/${id}`, data);
}

//Supprimer un produit
const removeOneUsers = id =>{
    return http.delete(`/users/${id}`);
}

//Supprimer tous les produits
const removeAllUsers = () => {
    return http.delete(`/products`);
}

//Recherche par nom du produit
const findUserByName = name_product => {
    return http.get(`/products?name_product={$name_product}`);
}
//Export de toutes les methodes utilisable dans les fichiers concernés
export default {
    getAllUsers,
    getUSersById,
    createUsers,
    updateUsers,
    removeOneUsers,
    removeAllUsers,
    findUserByName
}