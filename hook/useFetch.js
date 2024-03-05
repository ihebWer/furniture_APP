// Importation des hooks nécessaires depuis React et de la bibliothèque axios pour faire des requêtes HTTP.
import { Text, View } from 'react-native'
import {useState, useEffect} from 'react'
import axios from 'axios';

// Déclaration du custom hook useFetch.
const useFetch = () => {
  // Déclaration des états pour stocker les données récupérées, l'état de chargement et les erreurs.
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Définition de la fonction fetchData qui va effectuer la requête HTTP GET.
  const fetchData = async () => {
    setIsLoading(true)

    try {
      // Utilisation d'axios pour envoyer une requête GET à l'API et stocker la réponse dans l'état 'data'.
      const response =  await axios.get('http://localhost:3000/api/products/')
      setData(response.data) // Mise à jour de l'état avec les données récupérées.
      setIsLoading(false)
    } catch (error) {
      setError(error) // En cas d'erreur, stocker l'erreur dans l'état.
    } finally{
      setIsLoading(false) // Désactivation de l'indicateur de chargement une fois la requête terminée.

    }
  }

     // Utilisation de useEffect pour appeler fetchData au montage du composant.
  useEffect(()=>{
    fetchData()
  },[]);

  // Fonction refetch pour permettre le rechargement des données à la demande.
  const refetch = () => {
    setIsLoading(true)
    fetchData()
  }
  
   // Le hook retourne les données, l'état de chargement, l'erreur et la fonction de rechargement pour être utilisés par les composants consommateurs.
  return {data, isLoading, error, refetch}
}

export default useFetch

