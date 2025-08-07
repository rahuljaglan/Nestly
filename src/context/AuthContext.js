// src/context/AuthContext.js
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../utils/firebase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [profileComplete, setProfileComplete] = useState(false);

  // ✅ Check if profile is complete by checking required fields
  const checkProfileCompletion = useCallback(async (uid) => {
    if (!uid) return false;
    try {
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const isComplete = !!data.fullName && !!data.bio;
        setProfileComplete(isComplete);
        return isComplete;
      } else {
        setProfileComplete(false);
        return false;
      }
    } catch (error) {
      console.error('Error checking profile completion:', error);
      setProfileComplete(false);
      return false;
    }
  }, []);

  // ✅ Handle Firebase auth state changes
  useEffect(() => {
    // const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
    //   if (firebaseUser) {
    //     setUser(firebaseUser);
    //     await checkProfileCompletion(firebaseUser.uid);
    //   } else {
    //     setUser(null);
    //     setProfileComplete(false);
    //   }
    //   setAuthLoading(false);
    // });
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log('🔥 Firebase user:', firebaseUser); // NEW LOG

      if (firebaseUser) {
        setUser(firebaseUser);
        const isComplete = await checkProfileCompletion(firebaseUser.uid);
        console.log('✅ Profile complete:', isComplete); // NEW LOG
      } else {
        console.log('❌ No user logged in'); // NEW LOG
        setUser(null);
        setProfileComplete(false);
      }

      setAuthLoading(false);
    });

    return unsubscribe;
  }, [checkProfileCompletion]);

  // ✅ Logout function
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setProfileComplete(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        authLoading,
        profileComplete,
        logout,
        setProfileComplete,
        refreshProfileStatus: () => checkProfileCompletion(user?.uid),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Hook to use auth context
export const useAuth = () => useContext(AuthContext);
