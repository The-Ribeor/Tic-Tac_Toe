import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { OnboardingScreen } from "../screen/OnboardingScreen";
import { GameModeScreen } from "../screen/GameModeScreen";
import { GameScreen } from "../screen/GameScreen";

const Stack = createNativeStackNavigator();

export function RootStack() {
  return (
    <Stack.Navigator
      initialRouteName="OnboardingScreen"
      screenOptions={{
        headerStyle: { backgroundColor: "#191B1F" },
      }}
    >
      <Stack.Screen
        name="OnboardingScreen"
        component={OnboardingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GameModeScreen"
        component={GameModeScreen}
        options={{
          title: "Lobby",
          headerTitleStyle: {
            color: "#FFFFFF", 
            fontFamily: "Poppins-SemiBold", 
            fontSize: 20,
          },
          headerBackTitle: "Onboarding",
          headerBackTitleStyle: { 
            fontFamily: "Poppins-SemiBold",
            fontSize: 16,
          },
          headerTintColor: "#FFFFFF",
        }}
      />
      <Stack.Screen
        name="GameScreen"
        component={GameScreen}
        options={{
          title: "Tic Tac Toe",
          headerTitleStyle: {
            color: "#FFFFFF", 
            fontFamily: "Poppins-SemiBold", 
            fontSize: 20,
          },
          headerBackTitle: "Modos",
          headerBackTitleStyle: { 
            fontFamily: "Poppins-SemiBold",
            fontSize: 16,
          },
          headerTintColor: "#FFFFFF",
        }}
      />
    </Stack.Navigator>
  );
}
