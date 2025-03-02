import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useAuth } from '@/contexts/AuthContext'; // Accessing auth context

// Use the navigation prop to navigate to ProfileScreen
const HomeScreen: React.FC<any> = ({ navigation }) => {
  const { logout } = useAuth(); // Access logout function from context

  // Function to navigate to the Profile screen
  const goToProfile = () => {
    navigation.navigate('Profile'); // Navigate to the Profile screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Home Screen</Text>
      <Button title="Go to Profile" onPress={goToProfile} />
      <Button title="Logout" onPress={logout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default HomeScreen;
