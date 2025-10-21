import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';  // Accessing auth context

const ProfileScreen: React.FC = () => {
  const { logout } = useAuth(); // Access logout function from context

  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the Profile Screen</Text>
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

export default ProfileScreen;
