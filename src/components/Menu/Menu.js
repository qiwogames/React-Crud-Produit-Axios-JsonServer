import React, {useState} from 'react';
import {Switch, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Products from "../Products/Products";
import AddProduct from "../Products/AddProduct";
import ProductsList from "../Products/ProductsList";
import Login from "../Login/Login";
import Register from "../Register/Register";


function Menu(){
    const [token, setToken] = useState()

    //Si le token match
    if(token){
        return <Login setToken={setToken}/>
    }

    return(
        <div>
            <nav className="navbar navbar-expand navbar-dark bg-info">
                <a href="/" className="navbar-brand">
                    REACT CRUD AXIOS JSON_SERVER
                </a>
                <div className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to={"/produits"} className="nav-link">
                            Liste des produits
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/ajouter_produit"} className="nav-link">
                            Ajouter un produits
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/connexion"} className="nav-link">
                            Connexion
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/inscription"} className="nav-link">
                            Inscription
                        </Link>
                    </li>
                </div>
            </nav>

            <div className="container mt-3">
                <Switch>
                    <Route exact path={["/", "/produits"]} component={ProductsList} />
                    <Route exact path="/ajouter_produit" component={AddProduct} />
                    <Route path="/produits/:id" component={Products} />
                    <Route path="/connexion" component={Login}/>
                    <Route path="/inscription" component={Register}/>
                </Switch>
            </div>
        </div>
    );
}

export default Menu;
