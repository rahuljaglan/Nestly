// src/screens/OnboardingScreen.js
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useAuth } from '../context/AuthContext';

const OnboardingScreen = () => {
  const { user, signOut } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Onboarding Screen</Text>
      <Text>Welcome, {user?.email}</Text>

      <Button title="Sign Out" onPress={() => signOut()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: 'center' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 10 },
});

export default OnboardingScreen;
