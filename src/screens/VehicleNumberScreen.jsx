import {
  Image,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import { MotiView } from "moti";
import Ionicons from "@expo/vector-icons/Ionicons";

const VehicleNumberScreen = ({ navigation }) => {
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const [vehicleNumberInput, setVehicleNumberInput] = useState("");
  const [vehicleNumberInputError, setVehicleNumberInputError] = useState(false);
  const [vehicleNumberInputErrorText, setVehicleNumberInputErrorText] =
    useState("Vehicle Number Already Registered");

  const handleProceed = async () => {
    navigation.navigate("Onboarding");
  };

  const handleBack = async () => {
    navigation.navigate("Login");
  };

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <MotiView
      style={{
        paddingHorizontal: 40,
        paddingVertical: 40,
        paddingBottom: 20,
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
      }}
      from={{ opacity: 0.8, translateX: 50 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ type: "timing" }}
    >
      <View>
        <Image
          style={{ width: 350, height: 200 }}
          source={require("../../assets/logo.png")}
        />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "space-between",
          paddingTop: 20,
          width: "100%",
        }}
      >
        <View>
          <View style={{ gap: 5 }}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              Welcome to ONEV!
            </Text>
            {!keyboardStatus && (
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "300",
                  textAlign: "center",
                }}
              >
                Please fill below details to verify you as a driver.
              </Text>
            )}
          </View>
          <View style={{ marginTop: 30, gap: 5 }}>
            <Text style={{ fontSize: 14, fontWeight: "300", paddingLeft: 5 }}>
              Please enter your vehicle number
            </Text>
            <TextInput
              style={{
                paddingVertical: 12,
                paddingHorizontal: 25,
                backgroundColor: "#edf2f6",
                elevation: 1,
                borderRadius: 23,
              }}
              placeholder="Vehicle Number"
              value={vehicleNumberInput}
              onChangeText={(e) => setVehicleNumberInput(e)}
            />
            {vehicleNumberInputError && (
              <Text
                style={{
                  textAlign: "left",
                  color: "#ff0000",
                  fontSize: 12,
                  paddingLeft: 5,
                }}
              >
                *{vehicleNumberInputErrorText}
              </Text>
            )}
          </View>
        </View>
        <TouchableOpacity onPress={handleProceed}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 16,
              backgroundColor: "#FFC20C",
              paddingVertical: 12,
              borderRadius: 50,
            }}
          >
            Proceed
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          position: "absolute",
          top: 50,
          left: 20,
        }}
      >
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="arrow-back" size={28} color="black" />
        </TouchableOpacity>
      </View>
    </MotiView>
  );
};

export default VehicleNumberScreen;
