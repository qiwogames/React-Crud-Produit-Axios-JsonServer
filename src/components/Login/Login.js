import React from 'react';


export default function Login(){
    return(
        <form>
            <h1 className="text-success text-center">Connexion</h1>
            <div className="form-group">
                <label>
                    <p>Nom utilisateur</p>
                    <input className="form-control" type="text"/>
                </label>
            </div>

            <div className="form-group">
                <label>
                    <p>Mot de passe</p>
                    <input className="form-control" type="password"/>
                </label>
            </div>

            <div>
                <button className="btn btn-info" type="submit">Connexion</button>
            </div>

        </form>
    )
}
