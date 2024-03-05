import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useContext } from 'react'
import styles from '../../screens/cart.style';
import {AntDesign} from '@expo/vector-icons'
import { COLORS } from '../../constants';
import { UpdteCartContext } from '../../context/updateCartContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';







// Définition du composant CartTitle qui prend en paramètre 'item', 'onPress' et 'select'.
const CartTitle = ({item, onPress, select}) => {
  // Utilisation du contexte UpdteCartContext pour gérer l'état de mise à jour du panier.
  const {updateCart, setUpdateCart} = useContext(UpdteCartContext)

  // Fonction asynchrone deleteCart pour supprimer un article du panier.
  const deleteCart = async(id) => {
    const token = await AsyncStorage.getItem("token");

    try {
      // Préparation de la requête DELETE avec le token d'authentification dans les en-têtes.
      const endpoint = `http://localhost:3000/api/carts/${id}`;
      const headers = {
        "Content-Type": "application/json",
        token: "Bearer " + JSON.parse(token),
      };

      const response = await axios.delete(endpoint, {headers} );

       // Si la suppression est réussie, mise à jour de l'état pour refléter les changements dans l'interface utilisateur.
      if (response.status === 200) {
        setUpdateCart(!updateCart);
      }
      
    } catch (error) {
      console.log(error.message); // En cas d'erreur, affichage du message d'erreur dans la console.
    }
  }
    
  // Structure du composant affichant les détails de l'article dans le panier avec une option pour le supprimer.
  return (
   <TouchableOpacity style={styles.favContainer(select ? COLORS.secondary : "#FFF")} onPress={onPress}>
        <View style={styles.imageContainer}>
            <Image
                source={{uri: item.cartItem.imageUrl}}
                style={styles.image}
            /> 
        </View>
        <View style={styles.textContainer}>
            <Text style={styles.productTxt} numberOfLines={1}>{item.cartItem.title}</Text>
            <Text style={styles.supplya} numberOfLines={1}>{item.cartItem.supplier}</Text>
            <Text style={styles.supplya} numberOfLines={1}>{item.cartItem.price}€ * {item.quantity}</Text>
        </View>

        <TouchableOpacity
        style={{paddingBottom: 20, paddingLeft: 75}}
        onPress={()=> deleteCart(item._id)}
        >
          <AntDesign
            name='delete'
            size={18}
            color={COLORS.red}
          />  
        </TouchableOpacity>
   </TouchableOpacity>
  )
}

export default CartTitle
