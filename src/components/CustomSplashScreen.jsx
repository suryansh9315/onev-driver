import { View } from "moti";
import { Image, Dimensions } from "react-native";

const CustomSplashScreen = () => {
  const width = Dimensions.get("screen").width;
  const height = Dimensions.get("screen").height;
  return (
    <View
      style={{
        height,
        width,
        backgroundColor: "#fffd00",
        alignItems: "center",
        justifyContent: "center"
      }}
      from={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
      }}
      exitTransition={{
        type: "timing",
        duration: 300,
      }}
    >
      <Image
        style={{ width: width, objectFit: "contain" }}
        source={require("../../assets/logo.png")}
      />
    </View>
  );
};

export default CustomSplashScreen;
