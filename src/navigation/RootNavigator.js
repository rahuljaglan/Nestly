// src/navigation/RootNavigator.js
import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../context/AuthContext';

import OnboardingCarousel from '../screens/OnboardingCarousel';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import CompleteProfileScreen from '../screens/CompleteProfileScreen';
import { ActivityIndicator, View } from 'react-native';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const { user, authLoading, profileComplete } = useAuth();
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      const alreadyLaunched = await AsyncStorage.getItem('alreadyLaunched');
      if (alreadyLaunched === null) {
        await AsyncStorage.setItem('alreadyLaunched', 'true');
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    };
    checkFirstLaunch();
  }, []);

  // If auth or first launch is still loading
  if (isFirstLaunch === null || authLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isFirstLaunch && !user ? (
        <Stack.Screen name="Onboarding" component={OnboardingCarousel} />
      ) : !user ? (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
        </>
      ) : !profileComplete ? (
        <Stack.Screen
          name="CompleteProfile"
          component={CompleteProfileScreen}
        />
      ) : (
        <Stack.Screen name="Home" component={HomeScreen} />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
