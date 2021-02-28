import React, {useState, useEffect} from 'react';
//Appel du fichier de services
import ApiServices from "../../services/ApiServices";
import styles from './Products.module.css';
//Appel des liens
import {Link} from "react-router-dom";

const Products = props => {
    const initialProducState = {
        id: null,
        name_product: "",
        description_product: "",
        price_product: "",
        image_product: "",
        published: false
    };

    const [currentProduct, setCurrentProduct] = useState(initialProducState);
    const [message, setMessage] = useState("");

    const getProduct = id =>{
        //Appel de la methode du services
        ApiServices.getProductById(id)
            .then(response => {
                setCurrentProduct(response.data);
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            });
    };

    useEffect(() =>{
        getProduct(props.match.params.id)
    }, [props.match.params.id]);

    //Changement d'etat
    const handleInputChange = event =>{
        //Recup des valeur des input
        const {name, value} = event.target;
        setCurrentProduct({
            ...currentProduct, [name]: value
        });
    };

    //Mise a jour de la publication
    const updatePublished = status =>{
        let data = {
            id: currentProduct.name_product,
            name_product: currentProduct.name_product,
            description_product: currentProduct.description_product,
            price_product: currentProduct.price_product,
            image_product: currentProduct.image_product,
            published: status
        };
        //Appel des services et de la methode update
        ApiServices.updateProduct(currentProduct.id, data)
            .then(response => {
                setCurrentProduct({
                    ...currentProduct, published: status
                });
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    //Mise a jour du produit en lui meme
    const updateTheProduct = () => {
        //Appel des services et ses methodes
        ApiServices.updateProduct(currentProduct.id, currentProduct)
            .then(response => {
                console.log(response.data)
                setMessage("Le produit à été mis a jour avec succès !");
            })
            .catch(error => {
                console.log(error);
            });
    };

    //Supprimer un produits
    const deleteTheProduct = () =>{
        //Appel du service et ses methodes
        ApiServices.removeOneProduct(currentProduct.id)
            .then(response => {
                console.log(response.data);
                props.history.push("/produits");
            })
            .catch(error => {
                console.log(error);
            });
    };

    //HTML
    return(
        <div>

            {currentProduct ? (
                <div className="edit-form">
                    <h4 className="text-info">Mettre à jour le produit</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="title">Nom du produit</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                name="name_product"
                                value={currentProduct.name_product}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description du produit</label>
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                name="description_product"
                                value={currentProduct.description_product}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="price">Prix du produit</label>
                            <input
                                type="text"
                                className="form-control"
                                id="price"
                                name="price_product"
                                value={currentProduct.price_product}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="image">Url de l'image du produit</label>
                            <input
                                type="text"
                                className="form-control"
                                id="image"
                                name="image_product"
                                value={currentProduct.image_product}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>
                                <strong>Status:</strong>
                            </label>
                            {currentProduct.published ? "Published" : "Pending"}
                        </div>
                    </form>

                    {currentProduct.published ? (
                        <button
                            className="btn btn-primary mr-2"
                            onClick={() => updatePublished(false)}
                        >
                            Non publié
                        </button>
                    ) : (
                        <button
                            className="btn btn-primary mr-2"
                            onClick={() => updatePublished(true)}
                        >
                            Publié
                        </button>
                    )}

                    <button className="btn btn-danger mr-2" onClick={deleteTheProduct}>
                        Supprimer
                    </button>

                    <button
                        type="submit"
                        className="btn btn-warning"
                        onClick={updateTheProduct}
                    >
                        Mettre à jour le produit
                    </button>
                    <p>{message}</p>
                </div>
            ) : (
                <div>
                    <br />
                    <p>Merci de cliquer sur un produit</p>
                </div>
            )}
        </div>
    );

}

export default Products;
