import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '@/screens/LoginScreen';
import HomeScreen from '@/screens/HomeScreen';
import ProfileScreen from '@/screens/ProfileScreen';
import { useAuth } from '@/contexts/AuthContext'; // Accessing auth context
import RegisterScreen from '@/screens/RegisterScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ExchangeGeneralScreen from '@/screens/ExchangeGeneralScreen';
import ExchangeGiftsScreen from '@/screens/ExchangeGiftsScreen';
import ExchangeSettingsScreen from '@/screens/ExchangeSettingsScreen';
import ExchangeWishesScreen from '@/screens/ExchangeWishesScreen';

// Define the parameter types for each tab
export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Profile: undefined;
  Exchange: { exchangeId: string };
};

const Stack = createStackNavigator<RootStackParamList>();

// Define the parameter types for the tab navigator
export type ExchangeTabsParamList = {
  General: { exchangeId: string };
  Wishes: { exchangeId: string };
  Gifts: { exchangeId: string };
  Settings: { exchangeId: string };
};

const ExchangeTabs = createBottomTabNavigator<ExchangeTabsParamList>();

const ExchangeTabScreens: React.FC<{
  route: { params: { exchangeId: string } };
}> = ({ route }) => {
  const { exchangeId } = route.params;
  return (
    <ExchangeTabs.Navigator screenOptions={{ headerShown: false }}>
      <ExchangeTabs.Screen
        name="General"
        component={ExchangeGeneralScreen}
        initialParams={{ exchangeId }}
      />
      <ExchangeTabs.Screen
        name="Wishes"
        component={ExchangeWishesScreen}
        initialParams={{ exchangeId }}
      />
      <ExchangeTabs.Screen
        name="Gifts"
        component={ExchangeGiftsScreen}
        initialParams={{ exchangeId }}
      />
      <ExchangeTabs.Screen
        name="Settings"
        component={ExchangeSettingsScreen}
        initialParams={{ exchangeId }}
      />
    </ExchangeTabs.Navigator>
  );
};

const Navigation = () => {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isAuthenticated ? 'Home' : 'Login'}>
        {!isAuthenticated ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen
              name="Exchange"
              component={ExchangeTabScreens}
              initialParams={{ exchangeId: 'defaultId' }} // Replace 'defaultId' with the appropriate id
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
