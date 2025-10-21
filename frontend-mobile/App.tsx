import React from 'react';
import { AuthProvider } from '@/contexts/AuthContext';  // Importing the AuthProvider
import Navigation from '@/navigation/Navigation';  // Importing the Navigation

export default function App() {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}
