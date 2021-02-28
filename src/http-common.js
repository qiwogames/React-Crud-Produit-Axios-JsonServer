import axios from "axios";

//Export du fichier
export default axios.create({
    //Appel de url de base de json_server
    baseURL: "http://localhost:3000",
    //Type de donnée
    headers: {
        "Content-type": "application/json"
    }
});