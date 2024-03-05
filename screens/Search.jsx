import { TextInput, TouchableOpacity, View, Image, Text } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./search.style";
import { Feather, Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants";
import axios from "axios";
import { FlatList } from "react-native-gesture-handler"; 
import SearchTile from "../components/home/SearchTile";



const Search = () => {
  const [searchKey, setSearchKey] = useState(''); // État pour stocker la clé de recherche saisie par l'utilisateur.
  const [searchResult, setSearchresult] = useState([]); // État pour stocker les résultats de recherche.
  // console.log(searchKey);
  // console.log(searchResult);

  // Fonction asynchrone appelée lors de la pression sur le bouton de recherche.
  const handlePress = async () => {
    try {
       // Effectue une requête GET à l'API de recherche de produits avec le mot-clé
      const response = await axios.get(
        `http://localhost:3000/api/products/search/${searchKey}`);
      setSearchresult(response.data); // Met à jour l'état avec les résultats de recherche.
    } catch (error) {
      console.log("failed to get products ", error);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.searchContainer}>
        <TouchableOpacity>
          <Ionicons
            name="camera-outline"
            style={styles.serachIcon}
            size={SIZES.xLarge}
          />
        </TouchableOpacity>
        <View style={styles.serachWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchKey}
            onChangeText={setSearchKey}
            placeholder="What are you looking for "
          />
        </View>
        <View>
          <TouchableOpacity
            style={styles.searchBtn}
            onPress={() => handlePress()}
          >
            <Feather name="search" size={24} color={COLORS.offwhite} />
          </TouchableOpacity>
        </View>
      </View>
      {searchResult.length === 0 ?(
        <View style={{flex:1}}>
          <Image
          source={require('../assets/images/Pose23.png')}
          style={styles.searchImage}
          />
        </View>
      ):(
        <FlatList
        data={searchResult}
        keyExtractor={(item)=>item._id}
        renderItem={({item})=> ( <SearchTile   item = {item}   />  )   }
        style={{marginHorizontal: 12}}
        />
      )}
    </SafeAreaView>
  );
};

export default Search;
