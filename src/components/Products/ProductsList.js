import React, {useState, useEffect} from 'react';
//Appel du fichier de services
import ApiServices from "../../services/ApiServices";
import styles from './Products.module.css';
//Appel des liens
import {Link} from "react-router-dom";

//Creation de constante tableau de valeur et etat
const ProductsList = () => {
    //Tableau de produits
    const [products, setProducts] = useState([]);
    //Produits courant
    const [currentproduct, setCurrentproduct] = useState(null);
    //Tableau par index (cle + valeur)
    const [currentProductIndex, setCurrentProductIndex] = useState(-1);
    //Tableau de recherche par nom de produits
    const [searchName, setSearchName] = useState("");

    //Ils permettent de bénéficier d’un état local et
    //d’autres fonctionnalités de React sans avoir à écrire de classes.

    useEffect(() => {
        retrieveProduct();
    }, []);

    //Changement d'etat lors de la recherche de produit
    const onChangeSearchByName = event =>{
        //On creer un constante qui est egale a un evenement de la valeur cible
        //En l'ocurence le nom du produit rechercher
        const searchByName = event.target.value;
        //Appel de la constante du tableau init en haut = fonction useState
        setSearchName(searchByName);
    }

    //Retouver les produits
    const retrieveProduct = () => {
        //Appel de la methode du services
        ApiServices.getAllProduct()
            .then(response => {
                //const tableau setProduct =
                setProducts(response.data);
                //Debug
                console.log(response.data)
            });
    };

    //Rafraichir la liste
    const refreshList = () => {
        //Rappel de la constante qui liste tous les produits
        retrieveProduct();
        //Appel des produits courant
        setCurrentproduct(null);
        //Rappel de l'index
        setCurrentProductIndex(-1);
    }

    //Recup du produit actif
    const setActiveproduct = (products, index) => {
        setCurrentproduct(products);
        setCurrentProductIndex(index);
    }

    //Supprimer tous les produits (removeAllProducts)
    const deleteAllProducts = () =>{
        //Appel de la methode du service
        ApiServices.removeAllProducts()
            .then(response => {
                //debug
                console.log(response.data);
                //On rafraichit la liste
                refreshList();
            })
            .catch(error => {
                console.log(error);
            });
    };

    //Recherche de produit par nom
    const findByName = () => {
        //Appel de la methode du service
        ApiServices.findProductByName(searchName)
            .then(response => {
                setProducts(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log(error)
            });
    };

    return(
        //Ici HTML
        <div className="list row">
            <div className="col-md-8">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Recherche de produit par nom"
                        value={searchName}
                        onChange={onChangeSearchByName}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={findByName}
                        >
                           Rechercher
                        </button>
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <h4>Liste des produits</h4>

                <ul className="list-group">
                    {products &&
                    products.map((products, index) => (
                        <li id="product-item"
                            className={
                                "list-group-item " + (index === currentProductIndex ? "active" : "")
                            }
                            onClick={() => setActiveproduct(products, index)}
                            key={index}
                        >
                            {products.name_product}
                        </li>
                    ))}
                </ul>

                <button
                    className="m-3 btn btn-sm btn-danger"
                    onClick={deleteAllProducts}
                >
                    Supprimer tous les produits (ATTENTION OPERATION IRREVERSIBLE !!!)
                </button>
            </div>
            <div className="col-md-6">
                {currentproduct ? (
                    <div>
                        <h4>Produits</h4>
                        <div>
                            <label>
                                <strong>Nom du produit:</strong>
                            </label>{" "}
                            {currentproduct.name_product}
                        </div>
                        <div>
                            <label>
                                <strong>Description du produit:</strong>
                            </label>{" "}<br />
                            {currentproduct.description_product}
                        </div>
                        <div>
                            <label>
                                <strong>Prix du produit:</strong>
                            </label>{" "}<br />
                            {currentproduct.price_product} €
                        </div>
                        <div>
                            <label>
                                <strong>Image du produit:</strong>
                            </label>{" "}<br />

                            <img src={currentproduct.image_product} alt={currentproduct.name_product} title={currentproduct.name_product} width="25%"/>
                        </div>
                        <div>
                            <label>
                                <strong>Status:</strong>
                            </label>{" "}
                            {currentproduct.published ? "Publié" : "En attente"}
                        </div>

                        <Link
                            to={"/produits/" + currentproduct.id}
                            className="btn btn-info"
                        >
                            Editer le produit
                        </Link>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Merci de cliquer sur produit...</p>
                    </div>
                )}
            </div>
        </div>
    );

}

export default ProductsList