import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { MotiView } from "moti";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import SelectDropdown from "react-native-select-dropdown";

const cities = ["Delhi", "Bangalore", "Hyderabad", "Mumbai"];
const vehicles = ["Tata Ace EV", "3 Wheeler EV", "2 Wheeler EV", "Other"];

const OnboardingScreen = ({ navigation }) => {
  const [ownerNumberInput, setOwnerNumberInput] = useState("");
  const [driverNumberInput, setDriverNumberInput] = useState("");
  const [ownerNameInput, setOwnerNameInput] = useState("");
  const [citySelect, setCitySelect] = useState("Delhi");
  const [vehicleSelect, setVehicleSelect] = useState("Tata Ace EV");
  const [ownerNumberInputError, setOwnerNumberInputError] = useState(false);
  const [driverNumberInputError, setDriverNumberInputError] = useState(false);
  const [ownerNameInputError, setOwnerNameInputError] = useState(false);

  const handleProceed = async () => {

  }

  const handleBack = async () => {
    navigation.navigate("VehicleNumber");
  };

  return (
    <MotiView
      style={{ flex: 1 }}
      from={{ opacity: 0.8, translateX: 50 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ type: "timing" }}
    >
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 30,
          paddingVertical: 40,
          paddingBottom: 20,
          alignItems: "center",
        }}
      >
        <View>
          <Image
            style={{ width: 350, height: 200 }}
            source={require("../../assets/logo.png")}
          />
        </View>
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
          <Text
            style={{
              fontSize: 16,
              fontWeight: "300",
              textAlign: "center",
            }}
          >
            Please fill below details to verify you as a driver.
          </Text>
        </View>
        <View style={{ marginTop: 50, width: "100%", gap: 20 }}>
          <View style={{ gap: 5 }}>
            <Text style={{ paddingLeft: 5, fontSize: 14, fontWeight: "300" }}>
              Owner's Number
            </Text>
            <TextInput
              style={{
                paddingVertical: 12,
                paddingHorizontal: 20,
                backgroundColor: "#edf2f6",
                elevation: 1,
                borderRadius: 23,
              }}
              keyboardType="numeric"
              placeholder="Enter Number"
              value={ownerNumberInput}
              onChangeText={(e) => setOwnerNumberInput(e)}
            />
            {ownerNumberInputError && (
              <Text
                style={{
                  textAlign: "left",
                  color: "#ff0000",
                  fontSize: 12,
                  paddingLeft: 5,
                }}
              >
                *Enter a valid 10 digit number
              </Text>
            )}
          </View>
          <View style={{ gap: 5 }}>
            <Text style={{ paddingLeft: 5, fontSize: 14, fontWeight: "300" }}>
              Driver's Number
            </Text>
            <TextInput
              style={{
                paddingVertical: 12,
                paddingHorizontal: 20,
                backgroundColor: "#edf2f6",
                elevation: 1,
                borderRadius: 23,
              }}
              placeholder="Enter Number"
              keyboardType="numeric"
              value={driverNumberInput}
              onChangeText={(e) => setDriverNumberInput(e)}
            />
            {driverNumberInputError && (
              <Text
                style={{
                  textAlign: "left",
                  color: "#ff0000",
                  fontSize: 12,
                  paddingLeft: 5,
                }}
              >
                *Enter a valid 10 digit number
              </Text>
            )}
          </View>
          <View style={{ gap: 5 }}>
            <Text style={{ paddingLeft: 5, fontSize: 14, fontWeight: "300" }}>
              Owner's Name
            </Text>
            <TextInput
              style={{
                paddingVertical: 12,
                paddingHorizontal: 20,
                backgroundColor: "#edf2f6",
                elevation: 1,
                borderRadius: 23,
              }}
              placeholder="Enter Name"
              value={ownerNameInput}
              onChangeText={(e) => setOwnerNameInput(e)}
            />
            {ownerNameInputError && (
              <Text
                style={{
                  textAlign: "left",
                  color: "#ff0000",
                  fontSize: 12,
                  paddingLeft: 5,
                }}
              >
                *Enter a valid name
              </Text>
            )}
          </View>
          <View style={{ gap: 5 }}>
            <Text style={{ paddingLeft: 5, fontSize: 14, fontWeight: "300" }}>
              City
            </Text>
            <SelectDropdown
              data={cities}
              onSelect={(selectedItem, index) => {
                setCitySelect(selectedItem);
              }}
              defaultValueByIndex={0}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
              buttonStyle={{
                width: "100%",
                backgroundColor: "#edf2f6",
                borderRadius: 23,
                paddingVertical: 12,
                paddingHorizontal: 15,
                elevation: 1,
              }}
              buttonTextStyle={{
                color: "#000000",
                textAlign: "left",
                fontSize: 15,
                padding: 0,
                margin: 0,
              }}
              renderDropdownIcon={(isOpened) => {
                return (
                  <FontAwesome
                    name={isOpened ? "chevron-up" : "chevron-down"}
                    color={"#494949"}
                    size={16}
                    style={{ marginRight: 10 }}
                  />
                );
              }}
              dropdownIconPosition={"right"}
              dropdownStyle={{ backgroundColor: "#EFEFEF", borderRadius: 20 }}
              rowStyle={{
                backgroundColor: "#edf2f6",
                paddingHorizontal: 10,
                borderBottomColor: "#C5C5C5",
              }}
              rowTextStyle={{
                color: "#000000",
                textAlign: "left",
                fontSize: 16,
              }}
            />
          </View>
          <View style={{ gap: 5 }}>
            <Text style={{ paddingLeft: 5, fontSize: 14, fontWeight: "300" }}>
              Vehicle Type
            </Text>
            <SelectDropdown
              data={vehicles}
              onSelect={(selectedItem, index) => {
                setVehicleSelect(selectedItem);
              }}
              defaultValueByIndex={0}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
              buttonStyle={{
                width: "100%",
                backgroundColor: "#edf2f6",
                borderRadius: 23,
                paddingVertical: 12,
                paddingHorizontal: 15,
                elevation: 1,
              }}
              buttonTextStyle={{
                color: "#000000",
                textAlign: "left",
                fontSize: 15,
                padding: 0,
                margin: 0,
              }}
              renderDropdownIcon={(isOpened) => {
                return (
                  <FontAwesome
                    name={isOpened ? "chevron-up" : "chevron-down"}
                    color={"#494949"}
                    size={16}
                    style={{ marginRight: 10 }}
                  />
                );
              }}
              dropdownIconPosition={"right"}
              dropdownStyle={{ backgroundColor: "#EFEFEF", borderRadius: 20 }}
              rowStyle={{
                backgroundColor: "#edf2f6",
                paddingHorizontal: 10,
                borderBottomColor: "#C5C5C5",
              }}
              rowTextStyle={{
                color: "#000000",
                textAlign: "left",
                fontSize: 16,
              }}
            />
          </View>
          <TouchableOpacity onPress={handleProceed} style={{marginTop: 20}}>
            <Text
              style={{
                textAlign: "center",
                fontSize: 16,
                backgroundColor: "#fffd00",
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
      </ScrollView>
    </MotiView>
  );
};

export default OnboardingScreen;
