import React, { useEffect,useState } from 'react';

/* Thired Party Imports */
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

/* Custom Import files */
import LoginScreen from './Screen/LoginScreen';
import RegisterScreen from './Screen/RegisterScreen';
import HomeScreen from './Screen/HomeScreen';
import AddChatScreen from './Screen/AddChatScreen';
import ChatScreen from './Screen/ChatScreen';
import { auth, onAuthStateChangedAuthUser } from './firebase';
const Stack = createNativeStackNavigator();

const globalScreenOptions = {
  headerStyle: { backgroundColor: "#2C6BED" },
  headerTitleStyle: {
    color: "white",
  },
  headerTintColor: "white",
  headerTitleAlign: "center",
}

export default function App() {
  const [initialRouteName, setInitialRouteName] = useState("Login");
  useEffect(() => {
    onAuthStateChangedAuthUser((authUser) => {
      if (authUser) {
     
      }
    });
    
  }, [initialRouteName])
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={globalScreenOptions}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddChat" component={AddChatScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
