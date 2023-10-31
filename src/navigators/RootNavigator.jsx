import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import OnboardingScreen from "../screens/OnboardingScreen";
import VehicleNumberScreen from "../screens/VehicleNumberScreen";
import { phone_number, session_token, user_info } from "../atoms/User";
import { useRecoilState } from "recoil";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import CustomSplashScreen from "../components/CustomSplashScreen";
import { AnimatePresence } from "moti";

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const [number, setNumber] = useRecoilState(phone_number);
  const [token, setToken] = useRecoilState(session_token);
  const [user, setUser] = useRecoilState(user_info);
  const [loading, setLoading] = useState(true);

  const deleteData = async () => {
    try {
      await AsyncStorage.removeItem("user_info");
    } catch (e) {
      console.log(e);
    }
  };

  const logout = () => {
    deleteData();
    setToken(null);
    setNumber(null);
    setUser(null);
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("user_info");
      if (jsonValue !== null) {
      }
    } catch (e) {
      console.log(e);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    const hideSplash = async () => await SplashScreen.hideAsync();
    hideSplash();
    getData();
  }, []);

  return (
    <AnimatePresence>
      {loading ? (
        <CustomSplashScreen key="Splash" />
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }} key="Navigator">
          {token && user ? (
            <>
              <Stack.Screen name="Home" component={HomeScreen} />
            </>
          ) : (
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="VehicleNumber" component={VehicleNumberScreen} />
              <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            </>
          )}
        </Stack.Navigator>
      )}
    </AnimatePresence>
  );
};

export default RootNavigator;
