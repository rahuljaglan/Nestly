// src/navigation/RootNavigator.js
import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View } from 'react-native';
import { useAuth } from '../context/AuthContext';
import OnboardingCarousel from '../screens/OnboardingCarousel';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import CompleteProfileScreen from '../screens/CompleteProfileScreen';
import HomeScreen from '../screens/HomeScreen';
import SwipeScreen from '../screens/SwipeScreen';
import MatchScreen from '../screens/MatchScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ChatScreen from '../screens/ChatScreen';

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

  // Show loading spinner while checking auth or onboarding
  console.log('user:', user);
  console.log('authLoading:', authLoading);
  console.log('profileComplete:', profileComplete);
  console.log('isFirstLaunch:', isFirstLaunch);
  if (authLoading || isFirstLaunch === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  let initialRoute = '';

  if (isFirstLaunch && !user) {
    initialRoute = 'Onboarding';
  } else if (!user) {
    initialRoute = 'Login';
  } else if (!profileComplete) {
    initialRoute = 'CompleteProfile';
  } else {
    initialRoute = 'Swipe';
  }

  // 👇 ADD THIS LINE RIGHT HERE
  console.log('➡️ Navigating to initial route:', initialRoute);

  // return (
  //   <Stack.Navigator
  //     initialRouteName={initialRoute}
  //     screenOptions={{ headerShown: false }}
  //   >
  //     {/* Onboarding Flow */}
  //     {isFirstLaunch && !user ? (
  //       <Stack.Screen name="Onboarding" component={OnboardingCarousel} />
  //     ) : !user ? (
  //       <>
  //         <Stack.Screen name="Login" component={LoginScreen} />
  //         <Stack.Screen name="Signup" component={SignupScreen} />
  //       </>
  //     ) : !profileComplete ? (
  //       <Stack.Screen
  //         name="CompleteProfile"
  //         component={CompleteProfileScreen}
  //       />
  //     ) : (
  //       <>
  //         <Stack.Screen name="Swipe" component={SwipeScreen} />
  //         <Stack.Screen name="Home" component={HomeScreen} />
  //         <Stack.Screen name="MatchScreen" component={MatchScreen} />
  //         <Stack.Screen name="Profile" component={ProfileScreen} />
  //         <Stack.Screen name="Chat" component={ChatScreen} />
  //       </>
  //     )}
  //   </Stack.Navigator>
  // );

  return (
    <Stack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{ headerShown: false }}
    >
      {/* Onboarding Flow */}
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
        <>
          <Stack.Screen name="Swipe" component={SwipeScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="MatchScreen" component={MatchScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
        </>
      )}

      {/* ✅ Always available */}
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
};
export default RootNavigator;

// src/navigation/RootNavigator.js
// import React, { useEffect, useState } from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { ActivityIndicator, View } from 'react-native';
// import { useAuth } from '../context/AuthContext';

// import OnboardingCarousel from '../screens/OnboardingCarousel';
// import LoginScreen from '../screens/LoginScreen';
// import SignupScreen from '../screens/SignupScreen';
// import CompleteProfileScreen from '../screens/CompleteProfileScreen';
// import HomeScreen from '../screens/HomeScreen';
// import SwipeScreen from '../screens/SwipeScreen';
// import MatchScreen from '../screens/MatchScreen';
// import ProfileScreen from '../screens/ProfileScreen';
// import { useNavigation } from '@react-navigation/native';

// const Stack = createNativeStackNavigator();

// const RootNavigator = () => {
//   const { user, authLoading, profileComplete } = useAuth();
//   const [isFirstLaunch, setIsFirstLaunch] = useState(null);

//   const navigation = useNavigation();

//   useEffect(() => {
//     const checkFirstLaunch = async () => {
//       const alreadyLaunched = await AsyncStorage.getItem('alreadyLaunched');
//       if (alreadyLaunched === null) {
//         await AsyncStorage.setItem('alreadyLaunched', 'true');
//         setIsFirstLaunch(true);
//       } else {
//         setIsFirstLaunch(false);
//       }
//     };
//     checkFirstLaunch();
//   }, []);

//   useEffect(() => {
//     if (!authLoading && isFirstLaunch !== null) {
//       if (isFirstLaunch && !user) {
//         navigation.replace('Onboarding');
//       } else if (!user) {
//         navigation.replace('Login');
//       } else if (!profileComplete) {
//         navigation.replace('CompleteProfile');
//       } else {
//         navigation.replace('Swipe');
//       }
//     }
//   }, [authLoading, isFirstLaunch, user, profileComplete]);

//   if (authLoading || isFirstLaunch === null) {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }

//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="Onboarding" component={OnboardingCarousel} />
//       <Stack.Screen name="Login" component={LoginScreen} />
//       <Stack.Screen name="Signup" component={SignupScreen} />
//       <Stack.Screen name="CompleteProfile" component={CompleteProfileScreen} />
//       <Stack.Screen name="Swipe" component={SwipeScreen} />
//       <Stack.Screen name="Home" component={HomeScreen} />
//       <Stack.Screen name="MatchScreen" component={MatchScreen} />
//       <Stack.Screen name="Profile" component={ProfileScreen} />
//     </Stack.Navigator>
//   );
// };

// export default RootNavigator;
