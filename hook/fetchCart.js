import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { UpdteCartContext } from "../context/updateCartContext"; 

// Custom hook pour récupérer les données du panier
const fetchCart = () => {
    const [data, setData] = useState([]);
    const [loading, setLoader] = useState(false);
    const [error, setError] = useState(null);
    const {updateCart, setUpdateCart} = useContext(UpdteCartContext) // Utilisation du contexte pour réagir aux mises à jour du panier

    const fetchData = async () => {
        setLoader(true); // Début du chargement
        const token = await AsyncStorage.getItem('token'); // Récupération du token stocké

        try {
            const endpoint = 'http://localhost:3000/api/carts/find';

            const headers = {
                'Content-Type': 'application/json',
                'token': 'Bearer ' + JSON.parse(token) // Ajout du token dans l'en-tête de la requête
            };

            const response = await axios.get(endpoint, { headers });
            console.log(response.data[0].products);
            const cartProducts = response.data[0].products;

           
            
            setData(response.data); // Mise à jour de l'état avec les données récupérées
            // console.log(response.data);

            setLoader(false);
        } catch (error) {
            setError(error) // En cas d'erreur, mise à jour de l'état d'erreur
        }finally{
            setLoader(false); // Fin du chargement
        }
    }

    useEffect(() =>{
        fetchData(); // Appel de fetchData au montage du composant
    }, [updateCart]); // Dépendance à updateCart pour relancer la requête lorsque le panier est mis à jour

    const refetch = ()=> {
        setLoader(true);
        fetchData();
    }


    return {data, loading, error, refetch} // Retourne les états et la fonction refetch pour utilisation dans les composants


};

export default fetchCart;

