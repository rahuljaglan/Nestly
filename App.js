// App.js
import React from 'react';
import { AuthProvider } from './src/context/AuthProvider';
import AppNavigator from './src/AppNavigator';

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
