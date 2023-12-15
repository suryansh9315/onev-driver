import {
  Image,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MotiView } from "moti";
import Loader from "../components/Loader";
import { CodeField } from "react-native-confirmation-code-field";

const API_URL = process.env.EXPO_PUBLIC_API_URL;
const CELL_COUNT = 4;

const LoginScreen = ({ navigation }) => {
  const [mobileNumberInput, setMobileNumberInput] = useState("");
  const [mobileNumberInputError, setMobileNumberInputError] = useState(false);
  const [otpInputError, setOtpInputError] = useState(false);
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const [showOTPScreen, setShowOTPScreen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verificationKey, setVerificationKey] = useState("");
  const [value, setValue] = useState("");

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

  const requestOTP = async () => {
    if (mobileNumberInput.length !== 10) {
      setMobileNumberInputError(true);
    } else {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}/api/auth/login`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            number: mobileNumberInput,
          }),
        });
        const json = await response.json();
        console.log(json);
        if (response.status === 400) {
          alert(json?.message);
        } else {
          setVerificationKey(json.details);
          setShowOTPScreen(true);
        }
      } catch (error) {
        console.log(error);
        alert("Something Went Wrong");
      } finally {
        setLoading(false);
      }
    }
  };

  const verifyOTP = async () => {
    if (value.length !== 4) {
      setOtpInputError(true);
    } else {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}/api/auth/verify`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone: mobileNumberInput,
            verification_key: verificationKey,
            otp: value,
          }),
        });
        const json = await response.json();
        console.log(json);
        if (response.status === 400) {
          alert(json?.message);
        } else {
          if (!json.driver.vehicle_number) {
            navigation.navigate("VehicleNumber");
          } else if (!json.driver.onboarded) {
            navigation.navigate("Onboarding");
          } else {
            navigation.navigate("Home");
          }
        }
      } catch (error) {
        console.log(error);
        alert("Something Went Wrong");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleBack = async () => {
    setShowOTPScreen(false);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <MotiView
      style={{ flex: 1, backgroundColor: "#FFC20C" }}
      from={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        type: "timing",
      }}
    >
      <View
        style={{
          flex: keyboardStatus ? 1 : 0.9,
          backgroundColor: "#fff",
          borderBottomRightRadius: keyboardStatus ? 0 : 50,
          borderBottomLeftRadius: keyboardStatus ? 0 : 50,
          elevation: 1,
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 40,
          paddingVertical: 40,
        }}
      >
        <View>
          <Image
            style={{ width: 350, height: 200 }}
            source={require("../../assets/logo.png")}
          />
        </View>
        {!showOTPScreen ? (
          <MotiView
            style={{
              flex: 1,
              justifyContent: "space-between",
              paddingTop: keyboardStatus ? 30 : 50,
            }}
            from={{ opacity: 0.8, translateX: -50 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ type: "timing" }}
            key="Login"
          >
            <View style={{ gap: 20 }}>
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                Sign up as a driver and start accepting rides to earn money
              </Text>
              {!keyboardStatus && (
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "300",
                    textAlign: "center",
                  }}
                >
                  Add your phone number. We’ll send you a verification code so
                  we know you’re real
                </Text>
              )}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#ffffff",
                    height: 50,
                    borderRadius: 5,
                    gap: 5,
                    width: "28%",
                    elevation: 2,
                  }}
                >
                  <Image
                    source={require("../../assets/Flag.png")}
                    style={{ width: 30, aspectRatio: 1.3, borderRadius: 5 }}
                  />
                  <Text style={{ fontSize: 12 }}>+91</Text>
                  <Entypo name="chevron-thin-down" size={12} color="black" />
                </TouchableOpacity>
                <View style={{ width: "68%" }}>
                  <TextInput
                    style={{
                      borderRadius: 5,
                      backgroundColor: "#ffffff",
                      paddingHorizontal: 20,
                      paddingVertical: 12,
                      elevation: 2,
                    }}
                    placeholder="Mobile Number"
                    value={mobileNumberInput}
                    onChangeText={(text) => {
                      setMobileNumberInput(text);
                      if (text.length === 10) {
                        setMobileNumberInputError(false);
                      }
                    }}
                    inputMode="numeric"
                    maxLength={10}
                  />
                </View>
              </View>
              {mobileNumberInputError && (
                <View style={{ marginTop: -10, marginBottom: -10 }}>
                  <Text
                    style={{
                      textAlign: "left",
                      color: "#ff0000",
                      fontSize: 12,
                    }}
                  >
                    *Enter a valid 10 digit number
                  </Text>
                </View>
              )}
              <TouchableOpacity onPress={requestOTP}>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 16,
                    backgroundColor: "#FFC20C",
                    paddingVertical: 12,
                    borderRadius: 50,
                  }}
                >
                  Send OTP
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              {!keyboardStatus && (
                <Text
                  style={{
                    textAlign: "center",
                    fontWeight: "300",
                  }}
                >
                  By providing my phone number, I hereby agree and accept the
                  <Text style={{ fontWeight: "600" }}> Terms of service </Text>
                  and
                  <Text style={{ fontWeight: "600" }}> Privacy Policy</Text>.
                </Text>
              )}
            </View>
          </MotiView>
        ) : (
          <MotiView
            style={{ flex: 1, justifyContent: "space-between", paddingTop: 30 }}
            from={{ opacity: 0.8, translateX: 50 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ type: "timing" }}
            key="OTP"
          >
            <View style={{ gap: 20 }}>
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                Verify your Phone number
              </Text>
              {!keyboardStatus && (
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "300",
                    textAlign: "center",
                  }}
                >
                  Enter your OTP code here
                </Text>
              )}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  marginVertical: keyboardStatus ? 10 : 20,
                }}
              >
                <CodeField
                  value={value}
                  onChangeText={(e) => {
                    setValue(e);
                    if (e.length === 4) {
                      setOtpInputError(false);
                    }
                  }}
                  cellCount={CELL_COUNT}
                  rootStyle={{ gap: 10 }}
                  keyboardType="number-pad"
                  textContentType="oneTimeCode"
                  renderCell={({ index, symbol, isFocused }) => (
                    <Text
                      key={index}
                      style={[
                        {
                          width: 60,
                          height: 60,
                          borderRadius: 30,
                          lineHeight: 56,
                          fontSize: 24,
                          backgroundColor: "#ecf2f7",
                          textAlign: "center",
                          alignItems: "center",
                          justifyContent: "center",
                        },
                        isFocused && {
                          borderColor: "#000",
                        },
                      ]}
                    >
                      {symbol}
                    </Text>
                  )}
                />
              </View>
              {otpInputError && (
                <View style={{ marginTop: -20 }}>
                  <Text
                    style={{
                      textAlign: "left",
                      color: "#ff0000",
                      fontSize: 12,
                    }}
                  >
                    *Enter a valid 4 digit number
                  </Text>
                </View>
              )}
              <TouchableOpacity onPress={verifyOTP}>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 16,
                    backgroundColor: "#FFC20C",
                    paddingVertical: 12,
                    borderRadius: 50,
                  }}
                >
                  Verify OTP
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              {!keyboardStatus && (
                <Text
                  style={{
                    textAlign: "center",
                    fontWeight: "300",
                  }}
                >
                  Didn’t you receive any code?{" "}
                  <Text style={{ fontWeight: "600" }} onPress={requestOTP}>
                    Request Again
                  </Text>
                </Text>
              )}
            </View>
          </MotiView>
        )}
        {showOTPScreen && (
          <MotiView
            from={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              type: "timing",
            }}
            style={{
              position: "absolute",
              top: 50,
              left: 20,
            }}
          >
            <TouchableOpacity onPress={handleBack}>
              <Ionicons name="arrow-back" size={28} color="black" />
            </TouchableOpacity>
          </MotiView>
        )}
      </View>
    </MotiView>
  );
};

export default LoginScreen;
