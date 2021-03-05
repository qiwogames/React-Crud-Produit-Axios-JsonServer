//Import de react
import React, {useState} from "react";
//Import du fichier product Service
import ApiServices from "../../services/ApiServices";

//Constante ajouter un produit
const AddProduct = () =>{
    //Etat initial de app = init des variable json de db.json
    const initialProductState = {
        id: null,
        name_product: "",
        description_product: "",
        price_product: "",
        image_product: "",
        published: false
    }
    //Utilisation de la classe useState react
    const [products, setProducts] = useState(initialProductState);
    //Le formulaire n'est pas validé
    const [submitted, setSubmitted] = useState(false);

    //On appel cette constante dans le formulaire quand l'etat change
    const handleInputChange = event => {
        //On recup attribut name et sa valeur des inputs et ils sont la cible
        const {name, value} = event.target
        setProducts({
            //On decompile le tableau et recup le tableu de valeur
            ...products, [name]: value
        });
    };



    //Sauvegarde des valeur entrée dans le formulaire
    const saveProducts = () => {
        //Verif des champs du formulaire
        let errors = {};
        let formIsValid = true;
        //Creation d'un tableau de valeurs et assignation au tableu de valeur cible
        let data = {
            name_product: products.name_product,
            description_product: products.description_product,
            price_product: products.price_product,
            image_product: products.image_product
        }
        //On verifie que le champ n'est pas vide
        if(data.name_product === ""){
            alert("Merci de remplir le champs nom du produit !");
            formIsValid = false;
            return null;
        }else if(data.description_product === ""){
            alert("Merci de remplir le champ description du produit");
            formIsValid = false;
            return null;
        }else if(data.price_product === ""){
            alert("Merci de remplir le champ prix du produits");
            formIsValid = false;
            return null;
        }else if(data.image_product === ""){
            alert("Merci de remplti le champs image du produit");
            formIsValid = false;
            return null;
        }
        //Appel de la methode du service et passage du tableau ci-dessus en paramètres
        ApiServices.createProduct(data)
            .then(response => {
                //Ajout des valeurs
                setProducts({
                    id_product: response.data.id_product,
                    name_product: response.data.name_product,
                    description_product: response.data.description_product,
                    price_product: response.data.price_product,
                    image_product: response.data.image_product,
                    published: response.data.published
                });
                //Au click soumission du formulaire
                setSubmitted(true);
                //Debug
                console.log(response.data);
            })
            .catch(e =>{
                //Sinon on affiche une erreur
                console.log(e)
            })
    };

    //Ajout final du produit
    const newProduct = () => {
        setProducts(initialProductState);
        setSubmitted(false);
    };

    return(
        //Ici le formulaire appel de la constante newProduct au click sur le bouton ajouter
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>Produit ajouté avec succès !</h4>
                    <button className="btn btn-outline-success" onClick={newProduct}>
                        Ajouter un produit
                    </button>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <label htmlFor="title">Nom du produit</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            required
                            value={products.name_product}
                            onChange={handleInputChange}
                            name="name_product"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            rows="5"
                            type="text"
                            className="form-control"
                            id="description"
                            required
                            value={products.description_product}
                            onChange={handleInputChange}
                            name="description_product"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="price">Prix du produit</label>
                        <input
                            type="text"
                            className="form-control"
                            id="price"
                            required
                            value={products.price_product}
                            onChange={handleInputChange}
                            name="price_product"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="iamge">Url de l'image du produit</label>
                        <input
                            type="text"
                            className="form-control"
                            id="image"
                            required
                            value={products.image_product}
                            onChange={handleInputChange}
                            name="image_product"
                        />
                    </div>

                    <button onClick={saveProducts} className="btn btn-outline-info">
                        Sauver le produit
                    </button>
                </div>
            )}
        </div>
    );
}

export default AddProduct;