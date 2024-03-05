import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React from "react";
import styles from "./cart.style";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants";
import CartTile from "../components/OrdersTile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const Orders = ({ navigation }) => {
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");

      try {
        const endpoint = "http://localhost:3000/api/orders";
        const headers = {
          "Content-Type": "application/json",
          Authorization: "Bearer " + JSON.parse(token), // Ici, il faut utiliser 'Authorization'
        };

        const response = await axios.get(endpoint, { headers });
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        if (error.response) {
          // La requête a été faite et le serveur a répondu avec un statut hors de la plage de 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // La requête a été faite mais aucune réponse n'a été reçue
          console.log(error.request);
        } else {
          // Quelque chose s'est produit lors de la mise en place de la requête qui a déclenché une erreur
          console.log('Error', error.message);
        }
        setError(error);
      } finally {
        console.log("Réponse:", response ? response.data : "Aucune réponse");
        console.log("Erreur:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Ajoutez cette ligne pour définir l'état loading
  const [data, setData] = useState([]); // Supposons que vous aurez des données à afficher dans FlatList
  const [select, setSelect] = useState(false); // Si vous avez besoin de gérer la sélection
  const [selected, setSelected] = useState(null); // Pour stocker l'élément sélectionné

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
        <Text style={styles.titletxt}>Orders</Text>
      </View>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <CartTile
              item={item}
              onPress={() => {
                setSelect(!select), setSelected(item);
              }}
              select={select}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default Orders;
