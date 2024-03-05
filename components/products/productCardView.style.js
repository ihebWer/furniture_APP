import { StyleSheet, Dimensions } from "react-native";
import { COLORS, SIZES } from "../../constants/index";

const windowWidth = Dimensions.get('window').width;
const cardWidth = windowWidth / 2 - (SIZES.small+22) ;


const styles = StyleSheet.create({
  container:{
    width: cardWidth,
    height: 240,
    marginEnd:19,
    borderRadius:SIZES.medium,
    backgroundColor: COLORS.secondary,
    
  },
  ImageContainer:{
    // flex: 1,
    height: 150,
    width: 153,
    // marginLeft: SIZES.small/2,
    // marginTop: SIZES.small/2,
    borderRadius: SIZES.small,
    overflow: "hidden",
  },

  image:{
    width:"100%",
    height:"100%",
    // aspectRatio: 1,
    resizeMode: 'cover'
  },

  details:{
    padding: SIZES.small,
  },

  title:{
    fontFamily: "bold",
    fontSize: SIZES.small,
    marginBottom: 2,
  },

  supplier:{
    fontFamily: "regular",
    fontSize: SIZES.small,
    color: COLORS.gray,
  },

  price:{
    fontFamily: "bold",
    fontSize: SIZES.medium,
  
  },

  addBtn:{
    position: "absolute", 
    bottom: SIZES.xsmall,
    right: SIZES.xsmall,

  }


})


export default styles