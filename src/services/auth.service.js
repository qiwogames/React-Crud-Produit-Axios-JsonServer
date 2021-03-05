//Import d'axios pour requète HTTP
import axios from "axios";
const API_URL = "http://localhost:3000/";
//Url de json server

//Creation de la classe
class AuthService{

    //4 methodes connexion + inscription + deconnexion + recup user current
    login(name_user, password_user){
        return axios.post(API_URL + "connexion",{

        })
    }
}