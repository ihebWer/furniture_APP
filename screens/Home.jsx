import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, Fontisto } from "@expo/vector-icons";
import styles from "./home.style";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Welcome } from "../components";
import Carousel from "../components/home/carousel";
import Heading from "../components/home/Headings";
import ProductRow from "../components/products/ProductRow";
import Headings from "../components/home/Headings";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = ({navigation}) => {
  const [userData, setUserData] = useState(null);
  const [userLogin, setUserLogin] = useState(false);

  useEffect(()=> {
    checkExistingUser();
  },[]);

  const checkExistingUser = async () => {
    const id = await AsyncStorage.getItem('id')
    const useId = `user${JSON.parse(id)}`;
    
    try {
      const currentUser = await AsyncStorage.getItem(useId);

      if(currentUser !== null){
        const parsedData = JSON.parse(currentUser)
        setUserData(parsedData)
        setUserLogin(true)
      }
    } catch (error) {
      console.log("Error retrieving the data:", error)
    }

  };

  return (
    <SafeAreaView >
      <View style={styles.appBarWrapper}>
        <View style={styles.appBar}>
          <Ionicons name="location-outline" size={24} />

          <Text style={styles.location}> { userData ? userData.location : 'Your location' } </Text>

          <View style={{ alignItems: "flex-end" }}>
            <View style={styles.cartCount}>
              <Text style={styles.cartNumber}></Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
              <Fontisto name="shopping-bag" size={24} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView>
        <Welcome />
        <Carousel />
        <Headings />
        <ProductRow />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
