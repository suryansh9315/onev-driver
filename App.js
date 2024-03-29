import "react-native-reanimated";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import RootNavigator from "./src/navigators/RootNavigator.jsx";
import { RecoilRoot } from "recoil";

export default function App() {
  return (
    <SafeAreaProvider>
        <RecoilRoot>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </RecoilRoot>
    </SafeAreaProvider>
  );
}
