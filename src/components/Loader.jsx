import { useEffect, useRef } from "react";
import LottieView from "lottie-react-native";
import { View } from "react-native";

const Loader = () => {
  const loaderAnimationRef = useRef(null);

  useEffect(() => {
    loaderAnimationRef.current?.play();
    return () => {
      loaderAnimationRef.current?.reset();
    };
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <LottieView
        ref={loaderAnimationRef}
        style={{
          width: 150,
          height: 150,
        }}
        resizeMode="cover"
        source={require("../animations/loading_2.json")}
      />
    </View>
  );
};

export default Loader;
