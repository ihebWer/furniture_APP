import {
  TouchableOpacity,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  Image,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./cart.style";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants";
import fetchCart from "../hook/fetchCart";
import CartTitle from "../components/cart/CartTitle";
import { Button } from "../components";

const Cart = ({ navigation }) => {
  const { data, loading, error, refetch } = fetchCart(); // Utilisation du hook fetchCart pour récupérer les données du panier.
  const [selected, setSelected] = useState(null); // État pour gérer l'article sélectionné.
  const [select, setSelect] = useState(false); // État pour gérer si un article est sélectionné.

  
  console.log(selected);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="chevron-back-circle"
            size={30}
            color={COLORS.primary}
          />
        </TouchableOpacity>
        <Text style={styles.titletxt}>Cart</Text>
      </View>

      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <CartTitle
              item={item}
              onPress={() => {
                setSelect(!select), setSelected(item);
              }}
              select={select} 
            />
          )}
        />
      )}

      {select === false ? (<View></View>)
      : (
      <Button title={'Checkout'}
      isValid={select}
      onPress={()=> {}}
      loader={false}
      />)}
      
              

 
    </SafeAreaView>
  );
};

export default Cart;