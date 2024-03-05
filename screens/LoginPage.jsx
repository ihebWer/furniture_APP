import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  TextInput,
  Alert,
} from "react-native";
import React, { useState } from "react";
import styles from "./login.style";
import BackBtn from "../components/BackBtn";
import Button from "../components/Button";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  AntDesign,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { COLORS } from "../constants";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Schéma de validation pour le formulaire de connexion.
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(12, "Password must be at least 12 character ")
    .required("Required"),
  email: Yup.string()
    .email("Provide a valid email address")
    .required("Required"),
});
// Composant LoginPage avec navigation passée en prop pour la navigation entre les écrans.
const LoginPage = ({ navigation }) => {
  const [loader, setLoader] = useState(false); // État pour gérer l'affichage du loader.
  const [responseData, setResponseData] = useState(null); // Stocker les données de réponse.
  const [obsecureText, setObsecureText] = useState(false); // Gérer la visibilité du mot de passe.


  // Afficher une alerte pour un formulaire invalide.
  const inValidForm = () => {
    Alert.alert("Invalid Form", " Please provide all required fields", [
      {
        text: "Cancel",
        onPress: () => {},
      },
      {
        text: "Continue",
        onPress: () => {},
      },
      { defaultIndex: 1 },
    ]);
  };

   // Fonction asynchrone pour gérer la connexion.
  const login = async (values) =>{
    setLoader(true) // Activer le loader.
    // console.log(values);
    try {
      const  endpoint = "http://localhost:3000/api/login";
      const data  = values;

      const response = await axios.post(endpoint, data);
      if (response.status === 200) {
        
        
        setResponseData(response.data);
        console.log(`user${responseData._id}`);

        // Stockage des données de l'utilisateur dans AsyncStorage.
        await AsyncStorage.setItem(`user${responseData._id}`, JSON.stringify(responseData))
        await AsyncStorage.setItem('id', JSON.stringify(responseData._id))
        await AsyncStorage.setItem("token", JSON.stringify(responseData.token));

        setLoader(false); // Désactiver le loader.
        navigation.replace('Bottom Navigation') // Naviguer vers l'écran principal.

       // Gérer l'erreur de connexion.
      }else{
        Alert.alert("Error Loggin in", " Please provide a valid credentials", [
          {
            text: "Cancel",
            onPress: () => {},
          },
          {
            text: "Continue",
            onPress: () => {},
          },
          { defaultIndex: 1 },
        ]);

      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", " Please try again", [
      {
        text: "Cancel",
        onPress: () => {},
      },
      {
        text: "Continue",
        onPress: () => {},
      },
      { defaultIndex: 1 },
    ]);
  }finally{
    setLoader(false) // Désactiver le loader indépendamment du résultat.
  }
    
  };

   // Structure de l'écran de connexion utilisant ScrollView pour permettre le défilement.
  return (
    <ScrollView>
      <SafeAreaView style={{ marginHorizontal: 20 }}>
        <View>
          <BackBtn onPress={() => navigation.goBack()} />
          <Image
            source={require("../assets/images/bk.png")}
            style={styles.cover}
          />

          <Text style={styles.title}>                  unlimited Luxurious Furniture</Text>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={(values) => login(values)}
          >
            {({
              handleChange,
              touched,
              handleBlur,
              handleSubmit,
              values,
              errors,
              isValid,
              setFieldTouched,
            }) => (
              <View>
                <View>
                  <View style={styles.wrapper}>
                    <Text style={styles.label}>Email</Text>
                    <View
                      style={styles.inputWrapper(
                        touched.email ? COLORS.secondary : COLORS.offwhite
                      )}
                    >
                      <MaterialCommunityIcons
                        name="email-outline"
                        size={20}
                        color={COLORS.gray}
                        style={styles.iconStyle}
                      />
                      <TextInput
                        placeholder="Enter email"
                        onFocus={() => {
                          setFieldTouched("email");
                        }}
                        onBlur={() => {
                          setFieldTouched("email", "");
                        }}
                        value={values.email}
                        onChangeText={handleChange("email")}
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={{ flex: 1 }}
                      />
                    </View>

                    {touched.email && errors.email && (
                      <Text style={styles.errorMessage}> {errors.email} </Text>
                    )}
                  </View>

                  <View style={styles.wrapper}>
                    <Text style={styles.label}>Password</Text>
                    <View
                      style={styles.inputWrapper(
                        touched.password ? COLORS.secondary : COLORS.offwhite
                      )}
                    >
                      <MaterialCommunityIcons
                        name="lock-outline"
                        size={20}
                        color={COLORS.gray}
                        style={styles.iconStyle}
                      />
                      <TextInput
                        secureTextEntry={obsecureText}
                        placeholder="Password"
                        onFocus={() => {
                          setFieldTouched("password");
                        }}
                        onBlur={() => {
                          setFieldTouched("password", "");
                        }}
                        value={values.password}
                        onChangeText={handleChange("password")}
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={{ flex: 1 }}
                      />
                      <TouchableOpacity
                        onPress={() => {
                          setObsecureText(!obsecureText);
                        }}
                      >
                        <MaterialCommunityIcons
                          name={
                            !obsecureText ? "eye-outline" : "eye-off-outline"
                          }
                          size={18}
                        />
                      </TouchableOpacity>
                    </View>

                    {touched.password && errors.password && (
                      <Text style={styles.errorMessage}>
                        {" "}
                        {errors.password}{" "}
                      </Text>
                    )}
                    
                  </View>
                      
                  <Button
                    loader={loader}
                    title={"L O G I N"}
                    onPress={isValid ? handleSubmit : inValidForm}
                    isValid={isValid}
                  />

                  <Text
                    style={styles.registration}
                    onPress={() => navigation.navigate("SignUp")}
                  >
                    Register
                  </Text>
                </View>
              </View>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default LoginPage;
