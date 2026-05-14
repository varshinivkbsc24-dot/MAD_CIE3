import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CartProvider } from './src/context/CartContext';

// Screens
import WelcomeScreen from './src/screens/WelcomeScreen';
import MenuScreen from './src/screens/MenuScreen';
import CustomizationScreen from './src/screens/CustomizationScreen';
import CartScreen from './src/screens/CartScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Welcome"
          screenOptions={{
            headerShown: false, // Custom headers or none since we want a modern UI
            contentStyle: { backgroundColor: '#F5F5F5' }
          }}
        >
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Menu" component={MenuScreen} />
          <Stack.Screen 
            name="Customization" 
            component={CustomizationScreen} 
            options={{ presentation: 'modal', headerShown: true, title: 'Customize Item' }}
          />
          <Stack.Screen 
            name="Cart" 
            component={CartScreen} 
            options={{ presentation: 'modal', headerShown: true, title: 'Your Order' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
};

export default App;
