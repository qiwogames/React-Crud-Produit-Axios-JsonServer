import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styles from './Register.module.css';
import UsersServices from "../../services/UsersServices";

//constant ajouter un utilisatuer
const AddUser = () =>{
    //Etat de depart et init des variables
    const initialUserState = {
        id: null,
        name_user: "",
        email_user: "",
        password_user: ""
    }
    //Utilisation de useState React
    const [users, setUsers] = useState(initialUserState);
    const [submitted, setSubmitted] = useState(false);

    //Constante pour les changement async dans le foemulaire
    const handleInputChange = event => {
        //Recup de attribut name et ses valeurs
        const {name, value} = event.target
        setUsers({
            //On decompile le tableau json
            ...users, [name]: value
        })
    }

    //Sauvegarde de utilisateur
    const saveUsers = () => {
        //Verif des champ du formulaire
        let errors = {}
        let formIsValid = false
        //Tableau des valeurs sous forme d'objet
        let data = {
            name_user: users.name_user,
            email_user: users.email_user,
            password_user: users.password_user
        }
        //Verifier que les champs ne sont pas vide
        if(data.name_user === ""){
            alert("Merci de renter votre nom")
            formIsValid = false
            return null
        }else if(data.email_user === ""){
            alert("Merci de rentrer votre email")
            formIsValid = false
            return null
        }else if(data.password_user === ""){
            alert("Mercide rentrer votre mot de passe")
            formIsValid = false
            return null
        }

        //Appel de userService et ses methode de REST
        UsersServices.createUsers(data)
            .then(response => {
                //Ajout des valeur dans JSON
                setUsers({
                    id_user: response.data.id_user,
                    name_user: response.data.name_user,
                    email_user: response.data.email_user,
                    password_user: response.data.password_user
                    })
                //Au click appel de la soumission
                setSubmitted(true)
                //Debug
                console.log(response.data)
            })
            .catch(errors => {
                console.log(errors)
            })
    }

    const newUser = () => {
        setUsers(initialUserState)
        setSubmitted(false)
    }
}


    return(
        <div>

        { onsubmit ? (
            <h1 className="text-success">Utilisateur ajouté avec succès</h1>
        ) : (
            <form>
                <h1 className="text-warning text-center">Inscription</h1>
                <div className="form-group">
                    <label>
                        <p>Nom utilisateur</p>
                        <input className="form-control" type="text" value={this.users.name_user} onChange={}/>
                    </label>
                </div>

                <div className="form-group">
                    <label>
                        <p>Mot de passe</p>
                        <input className="form-control" type="password"/>
                    </label>
                </div>

                <div>
                    <button className="btn btn-info" type="submit">Inscription</button>
                </div>

            </form>
        )}

        </div>
    )


export default AddUser
