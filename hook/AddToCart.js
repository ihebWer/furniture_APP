// Importation des modules nécessaires depuis les bibliothèques externes.
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// Déclaration de la fonction asynchrone AddToCart qui prend en paramètres l'ID du produit et la quantité à ajouter.
const AddToCart = async(productId, quantity) => {
  try {
     // Récupération du token stocké localement avec AsyncStorage. Ce token est nécessaire pour l'authentification auprès de l'API.
    const token = await AsyncStorage.getItem('token');
    const endpoint = 'http://localhost:3000/api/carts';
    console.log(token); // Affichage du token dans la console pour vérification.

     // Préparation des données à envoyer dans la requête POST.
    const data ={
      cartItem : productId,
      quantity: quantity,
    }

     // Configuration des en-têtes de la requête, y compris le token d'authentification.
    const headers = {
      'Content-Type': 'application/json',
      'token': 'Bearer '+ JSON.parse(token) // Ajout du token au format Bearer token.
    };

     // Envoi de la requête POST à l'API avec axios, en passant les données et les en-têtes configurés.
    await axios.post(endpoint, data, {headers})
  } catch (error) {
    // En cas d'erreur lors de l'exécution de la requête, lever une exception avec le message d'erreur.
    throw new Error(error.message)
  }

};


export default AddToCart;