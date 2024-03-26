import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import MainScreen from "./screens/mainScreen";
import FlashcardFormScreen from "./screens/flashcardFormScreen";
import FlashcardDetailScreen from "./screens/flashcardDetailScreen";

const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Main"
                component={MainScreen}
                options={{ title: "Flashcard App" }}
            />
            <Stack.Screen
                name="FlashcardForm"
                component={FlashcardFormScreen}
                options={{ title: "Add/Edit Flashcard" }}
            />
            <Stack.Screen
                name="FlashcardDetail"
                component={FlashcardDetailScreen}
                options={{ title: "Flashcard Detail" }}
            />
        </Stack.Navigator>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <MyStack />
            <StatusBar style="auto" />
        </NavigationContainer>
    );
}
