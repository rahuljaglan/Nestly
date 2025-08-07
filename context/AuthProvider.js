import auth from '@react-native-firebase/auth';
import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((firebaseUser) => {
      console.log('🔥 Firebase user:', firebaseUser);

      setUser(firebaseUser);
      if (initializing) setInitializing(false);
    });

    return unsubscribe; // cleanup
  }, []);

  if (initializing) return null; // ⏳ Or show splash screen

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
