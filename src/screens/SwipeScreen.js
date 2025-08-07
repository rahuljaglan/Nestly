// src/screens/SwipeScreen.js
import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../utils/firebase';
import { useAuth } from '../context/AuthContext';
import Swiper from 'react-native-deck-swiper';
import ProfileCard from '../components/ProfileCard';

const SwipeScreen = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const swiperRef = useRef(null);

  useEffect(() => {
    let unsub;

    const fetchProfiles = async () => {
      const passes = await getDocs(collection(db, 'users', user.uid, 'passes'));
      const swipes = await getDocs(collection(db, 'users', user.uid, 'swipes'));

      const passedUserIds = passes.docs.map((doc) => doc.id);
      const swipedUserIds = swipes.docs.map((doc) => doc.id);

      const excludedIds = [...passedUserIds, ...swipedUserIds, user.uid];

      const q = query(
        collection(db, 'users'),
        where('__name__', 'not-in', excludedIds.slice(0, 10))
      );

      unsub = onSnapshot(q, (snapshot) => {
        setProfiles(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
        setLoading(false);
      });
    };

    fetchProfiles();

    return () => unsub && unsub();
  }, [db]);

  const swipeLeft = async (cardIndex) => {
    const userSwiped = profiles[cardIndex];
    if (!userSwiped) return;

    await setDoc(
      doc(db, 'users', user.uid, 'passes', userSwiped.id),
      userSwiped
    );
  };

  const swipeRight = async (cardIndex) => {
    const userSwiped = profiles[cardIndex];
    if (!userSwiped) return;

    const userRef = doc(db, 'users', user.uid);
    const swipedRef = doc(db, 'users', userSwiped.id, 'swipes', user.uid);

    // Check if they already swiped you
    const docSnap = await getDoc(swipedRef);

    if (docSnap.exists()) {
      // It's a match!
      console.log('🎉 Match!');

      // Save match info
      await setDoc(
        doc(db, 'users', user.uid, 'swipes', userSwiped.id),
        userSwiped
      );

      // Navigate to MatchScreen
      navigation.navigate('MatchScreen', {
        currentUser: {
          displayName: user.displayName,
          photoURL: user.photoURL,
        },
        matchedUser: {
          displayName: userSwiped.displayName,
          photoURL: userSwiped.photoURL,
        },
      });
    } else {
      // No match yet, just save swipe
      await setDoc(
        doc(db, 'users', user.uid, 'swipes', userSwiped.id),
        userSwiped
      );
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Swiper
        ref={swiperRef}
        cards={profiles}
        renderCard={(card) =>
          card ? (
            <ProfileCard profile={card} />
          ) : (
            <View style={styles.noMoreCards}>
              <ActivityIndicator />
            </View>
          )
        }
        onSwipedLeft={swipeLeft}
        onSwipedRight={swipeRight}
        cardIndex={0}
        backgroundColor="transparent"
        stackSize={5}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noMoreCards: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 400,
  },
});

export default SwipeScreen;
