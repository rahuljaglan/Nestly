// // src/screens/SwipeScreen.js
// import React, { useEffect, useState, useRef } from 'react';
// import { View, StyleSheet, ActivityIndicator } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import {
//   collection,
//   doc,
//   getDoc,
//   getDocs,
//   setDoc,
//   onSnapshot,
//   query,
//   where,
// } from 'firebase/firestore';
// import { db } from '../utils/firebase';
// import { useAuth } from '../context/AuthContext';
// import Swiper from 'react-native-deck-swiper';
// import ProfileCard from '../components/ProfileCard';

// const SwipeScreen = () => {
//   const { user } = useAuth();
//   const navigation = useNavigation();
//   const [profiles, setProfiles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const swiperRef = useRef(null);

//   useEffect(() => {
//     let unsub;

//     const fetchProfiles = async () => {
//       const passes = await getDocs(collection(db, 'users', user.uid, 'passes'));
//       const swipes = await getDocs(collection(db, 'users', user.uid, 'swipes'));

//       const passedUserIds = passes.docs.map((doc) => doc.id);
//       const swipedUserIds = swipes.docs.map((doc) => doc.id);

//       const excludedIds = [...passedUserIds, ...swipedUserIds, user.uid];

//       const q = query(
//         collection(db, 'users'),
//         where('__name__', 'not-in', excludedIds.slice(0, 10))
//       );

//       unsub = onSnapshot(q, (snapshot) => {
//         setProfiles(
//           snapshot.docs.map((doc) => ({
//             id: doc.id,
//             ...doc.data(),
//           }))
//         );
//         setLoading(false);
//       });
//     };

//     fetchProfiles();

//     return () => unsub && unsub();
//   }, [db]);

//   const swipeLeft = async (cardIndex) => {
//     const userSwiped = profiles[cardIndex];
//     if (!userSwiped) return;

//     await setDoc(
//       doc(db, 'users', user.uid, 'passes', userSwiped.id),
//       userSwiped
//     );
//   };

//   const swipeRight = async (cardIndex) => {
//     const userSwiped = profiles[cardIndex];
//     if (!userSwiped) return;

//     const userRef = doc(db, 'users', user.uid);
//     const swipedRef = doc(db, 'users', userSwiped.id, 'swipes', user.uid);

//     // Check if they already swiped you
//     const docSnap = await getDoc(swipedRef);

//     if (docSnap.exists()) {
//       // It's a match!
//       console.log('🎉 Match!');

//       // Save match info
//       await setDoc(
//         doc(db, 'users', user.uid, 'swipes', userSwiped.id),
//         userSwiped
//       );

//       // Navigate to MatchScreen
//       navigation.navigate('MatchScreen', {
//         currentUser: {
//           displayName: user.displayName,
//           photoURL: user.photoURL,
//         },
//         matchedUser: {
//           displayName: userSwiped.displayName,
//           photoURL: userSwiped.photoURL,
//         },
//       });
//     } else {
//       // No match yet, just save swipe
//       await setDoc(
//         doc(db, 'users', user.uid, 'swipes', userSwiped.id),
//         userSwiped
//       );
//     }
//   };

//   if (loading) {
//     return (
//       <View style={styles.center}>
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Swiper
//         ref={swiperRef}
//         cards={profiles}
//         renderCard={(card) =>
//           card ? (
//             <ProfileCard profile={card} />
//           ) : (
//             <View style={styles.noMoreCards}>
//               <ActivityIndicator />
//             </View>
//           )
//         }
//         onSwipedLeft={swipeLeft}
//         onSwipedRight={swipeRight}
//         cardIndex={0}
//         backgroundColor="transparent"
//         stackSize={5}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f9f9f9',
//   },
//   center: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   noMoreCards: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: 400,
//   },
// });

// export default SwipeScreen;

// src/screens/SwipeScreen.js
// import React, { useEffect, useState, useRef } from 'react';
// import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import {
//   collection,
//   doc,
//   getDoc,
//   getDocs,
//   setDoc,
//   onSnapshot,
//   query,
//   where,
//   serverTimestamp,
// } from 'firebase/firestore';
// import { db } from '../utils/firebase';
// import { useAuth } from '../context/AuthContext';
// import Swiper from 'react-native-deck-swiper';
// import ProfileCard from '../components/ProfileCard';

// // Helper to generate consistent match IDs
// const generateMatchId = (id1, id2) => {
//   return id1 > id2 ? id1 + id2 : id2 + id1;
// };

// const SwipeScreen = () => {
//   const { user } = useAuth();
//   const navigation = useNavigation();
//   const [profiles, setProfiles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const swiperRef = useRef(null);

//   useEffect(() => {
//     let unsub;

//     const fetchProfiles = async () => {
//       const passes = await getDocs(collection(db, 'users', user.uid, 'passes'));
//       const swipes = await getDocs(collection(db, 'users', user.uid, 'swipes'));

//       const passedUserIds = passes.docs.map((doc) => doc.id);
//       const swipedUserIds = swipes.docs.map((doc) => doc.id);

//       const excludedIds = [...passedUserIds, ...swipedUserIds, user.uid];

//       const q = query(
//         collection(db, 'users'),
//         where(
//           '__name__',
//           'not-in',
//           excludedIds.length > 0 ? excludedIds.slice(0, 10) : ['placeholder']
//         )
//       );

//       unsub = onSnapshot(q, (snapshot) => {
//         setProfiles(
//           snapshot.docs.map((doc) => ({
//             id: doc.id,
//             ...doc.data(),
//           }))
//         );
//         setLoading(false);
//       });
//     };

//     fetchProfiles();

//     return () => unsub && unsub();
//   }, [user.uid]);

//   // Pass (left swipe)
//   const swipeLeft = async (cardIndex) => {
//     const userSwiped = profiles[cardIndex];
//     if (!userSwiped) return;

//     await setDoc(
//       doc(db, 'users', user.uid, 'passes', userSwiped.id),
//       userSwiped
//     );

//     console.log(
//       `❌ Passed on ${userSwiped.displayName || userSwiped.fullName}`
//     );
//   };

//   // Like (right swipe) + check for match
//   const swipeRight = async (cardIndex) => {
//     const userSwiped = profiles[cardIndex];
//     if (!userSwiped) return;

//     const swipedRef = doc(db, 'users', userSwiped.id, 'swipes', user.uid);
//     const docSnap = await getDoc(swipedRef);

//     const loggedInProfile = {
//       id: user.uid,
//       displayName: user.displayName || user.fullName || '',
//       photoURL: user.photoURL || null,
//     };

//     if (docSnap.exists()) {
//       // Match found!
//       console.log('🎯 Match found!');

//       const matchId = generateMatchId(user.uid, userSwiped.id);

//       await setDoc(doc(db, 'matches', matchId), {
//         users: {
//           [user.uid]: loggedInProfile,
//           [userSwiped.id]: userSwiped,
//         },
//         userIds: [user.uid, userSwiped.id],
//         timestamp: serverTimestamp(),
//       });

//       await setDoc(
//         doc(db, 'users', user.uid, 'swipes', userSwiped.id),
//         userSwiped
//       );

//       navigation.navigate('MatchScreen', {
//         currentUser: loggedInProfile,
//         matchedUser: userSwiped,
//       });
//     } else {
//       // No match yet, just save swipe
//       await setDoc(
//         doc(db, 'users', user.uid, 'swipes', userSwiped.id),
//         userSwiped
//       );
//       console.log(`💚 Liked ${userSwiped.displayName || userSwiped.fullName}`);
//     }
//   };

//   if (loading) {
//     return (
//       <View style={styles.center}>
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Swiper
//         ref={swiperRef}
//         cards={profiles}
//         renderCard={(card) =>
//           card ? (
//             <ProfileCard user={card} /> // ✅ fixed prop name
//           ) : (
//             <View style={styles.noMoreCards}>
//               <Text>No more profiles</Text>
//             </View>
//           )
//         }
//         onSwipedLeft={swipeLeft}
//         onSwipedRight={swipeRight}
//         cardIndex={0}
//         backgroundColor="transparent"
//         stackSize={5}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f9f9f9',
//   },
//   center: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   noMoreCards: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: 400,
//   },
// });

// export default SwipeScreen;

// import React, { useEffect, useState, useRef } from 'react';
// import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import {
//   collection,
//   doc,
//   getDoc,
//   getDocs,
//   setDoc,
//   onSnapshot,
//   query,
//   where,
//   serverTimestamp,
// } from 'firebase/firestore';
// import { db } from '../utils/firebase';
// import { useAuth } from '../context/AuthContext';
// import Swiper from 'react-native-deck-swiper';
// import ProfileCard from '../components/ProfileCard';

// // Helper to generate consistent match IDs
// const generateMatchId = (id1, id2) => {
//   return id1 > id2 ? id1 + id2 : id2 + id1;
// };

// const SwipeScreen = () => {
//   const { user } = useAuth();
//   const navigation = useNavigation();
//   const [profiles, setProfiles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const swiperRef = useRef(null);

//   useEffect(() => {
//     if (!user?.uid) return; // ✅ Prevents undefined user crash
//     let unsub;

//     const fetchProfiles = async () => {
//       try {
//         setLoading(true);

//         const passes = await getDocs(
//           collection(db, 'users', user.uid, 'passes')
//         );
//         const swipes = await getDocs(
//           collection(db, 'users', user.uid, 'swipes')
//         );

//         const passedUserIds = passes.docs.map((doc) => doc.id);
//         const swipedUserIds = swipes.docs.map((doc) => doc.id);
//         const excludedIds = [
//           ...new Set([...passedUserIds, ...swipedUserIds, user.uid]),
//         ];

//         // Firestore "not-in" supports max 10 elements
//         const filterIds =
//           excludedIds.length > 0 ? excludedIds.slice(0, 10) : ['placeholder'];

//         const q = query(
//           collection(db, 'users'),
//           where('__name__', 'not-in', filterIds)
//         );

//         unsub = onSnapshot(q, (snapshot) => {
//           setProfiles(
//             snapshot.docs
//               .map((doc) => ({
//                 id: doc.id,
//                 ...doc.data(),
//               }))
//               .filter((profile) => profile.id !== user.uid)
//           );
//           setLoading(false);
//         });
//       } catch (error) {
//         console.error('Error fetching profiles:', error);
//         setLoading(false);
//       }
//     };

//     fetchProfiles();
//     return () => unsub && unsub();
//   }, [user?.uid]);

//   // Pass (left swipe)
//   const swipeLeft = async (cardIndex) => {
//     const userSwiped = profiles[cardIndex];
//     if (!userSwiped || !user?.uid) return;

//     await setDoc(
//       doc(db, 'users', user.uid, 'passes', userSwiped.id),
//       userSwiped
//     );

//     console.log(
//       `❌ Passed on ${userSwiped.displayName || userSwiped.fullName}`
//     );
//   };

//   // Like (right swipe) + check for match
//   // const swipeRight = async (cardIndex) => {
//   //   const userSwiped = profiles[cardIndex];
//   //   if (!userSwiped || !user?.uid) return;

//   //   const swipedRef = doc(db, 'users', userSwiped.id, 'swipes', user.uid);
//   //   const docSnap = await getDoc(swipedRef);

//   //   const loggedInProfile = {
//   //     id: user.uid,
//   //     displayName: user.displayName || user.fullName || '',
//   //     photoURL: user.photoURL || null,
//   //   };

//   //   if (docSnap.exists()) {
//   //     // Match found!
//   //     console.log('🎯 Match found!');

//   //     const matchId = generateMatchId(user.uid, userSwiped.id);

//   //     await setDoc(doc(db, 'matches', matchId), {
//   //       users: {
//   //         [user.uid]: loggedInProfile,
//   //         [userSwiped.id]: userSwiped,
//   //       },
//   //       userIds: [user.uid, userSwiped.id],
//   //       timestamp: serverTimestamp(),
//   //     });

//   //     await setDoc(
//   //       doc(db, 'users', user.uid, 'swipes', userSwiped.id),
//   //       userSwiped
//   //     );

//   //     navigation.navigate('MatchScreen', {
//   //       currentUser: loggedInProfile,
//   //       matchedUser: userSwiped,
//   //     });
//   //   } else {
//   //     // No match yet, just save swipe
//   //     await setDoc(
//   //       doc(db, 'users', user.uid, 'swipes', userSwiped.id),
//   //       userSwiped
//   //     );
//   //     console.log(`💚 Liked ${userSwiped.displayName || userSwiped.fullName}`);
//   //   }
//   // };
//   const handleSwipeRight = async (card) => {
//     const loggedInUserId = auth.currentUser.uid;
//     const otherUserId = card.id;

//     // Save this swipe
//     await setDoc(doc(db, 'users', loggedInUserId, 'swipes', otherUserId), {
//       timestamp: serverTimestamp(),
//     });

//     // Check if other user liked me before
//     const otherUserSwipeDoc = await getDoc(
//       doc(db, 'users', otherUserId, 'swipes', loggedInUserId)
//     );

//     if (otherUserSwipeDoc.exists()) {
//       // It's a match!
//       const matchId = [loggedInUserId, otherUserId].sort().join('_');

//       await setDoc(doc(db, 'matches', matchId), {
//         users: {
//           [loggedInUserId]: {
//             displayName: auth.currentUser.displayName,
//             photoURL: auth.currentUser.photoURL,
//           },
//           [otherUserId]: {
//             displayName: card.displayName,
//             photoURL: card.photoURL,
//           },
//         },
//         userIds: [loggedInUserId, otherUserId],
//         timestamp: serverTimestamp(),
//       });

//       console.log("🔥 It's a match!");
//       // Later: navigate to a Match screen
//     }
//   };

//   if (loading) {
//     return (
//       <View style={styles.center}>
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }

//   if (profiles.length === 0) {
//     return (
//       <View style={styles.center}>
//         <Text>No more profiles</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Swiper
//         ref={swiperRef}
//         cards={profiles}
//         renderCard={(card) =>
//           card ? (
//             <ProfileCard user={card} /> // ✅ Safe card rendering
//           ) : (
//             <View style={styles.noMoreCards}>
//               <Text>No more profiles</Text>
//             </View>
//           )
//         }
//         onSwipedLeft={swipeLeft}
//         onSwipedRight={swipeRight}
//         cardIndex={0}
//         backgroundColor="transparent"
//         stackSize={5}
//         disableTopSwipe
//         disableBottomSwipe
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f9f9f9',
//   },
//   center: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   noMoreCards: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: 400,
//   },
// });

// export default SwipeScreen;

// import React, { useEffect, useState, useRef } from 'react';
// import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import {
//   collection,
//   doc,
//   getDoc,
//   getDocs,
//   setDoc,
//   onSnapshot,
//   query,
//   where,
//   serverTimestamp,
// } from 'firebase/firestore';
// import { db } from '../utils/firebase';
// import { useAuth } from '../context/AuthContext';
// import Swiper from 'react-native-deck-swiper';
// import ProfileCard from '../components/ProfileCard';

// // Helper to generate consistent match IDs
// const generateMatchId = (id1, id2) => {
//   return id1 > id2 ? id1 + id2 : id2 + id1;
// };

// const SwipeScreen = () => {
//   const { user } = useAuth();
//   const navigation = useNavigation();
//   const [profiles, setProfiles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const swiperRef = useRef(null);

//   useEffect(() => {
//     if (!user?.uid) return; // ✅ Prevents undefined user crash
//     let unsub;

//     const fetchProfiles = async () => {
//       try {
//         setLoading(true);

//         const passes = await getDocs(
//           collection(db, 'users', user.uid, 'passes')
//         );
//         const swipes = await getDocs(
//           collection(db, 'users', user.uid, 'swipes')
//         );

//         const passedUserIds = passes.docs.map((doc) => doc.id);
//         const swipedUserIds = swipes.docs.map((doc) => doc.id);
//         const excludedIds = [
//           ...new Set([...passedUserIds, ...swipedUserIds, user.uid]),
//         ];

//         // Firestore "not-in" supports max 10 elements
//         const filterIds =
//           excludedIds.length > 0 ? excludedIds.slice(0, 10) : ['placeholder'];

//         const q = query(
//           collection(db, 'users'),
//           where('__name__', 'not-in', filterIds)
//         );

//         unsub = onSnapshot(q, (snapshot) => {
//           setProfiles(
//             snapshot.docs
//               .map((doc) => ({
//                 id: doc.id,
//                 ...doc.data(),
//               }))
//               .filter((profile) => profile.id !== user.uid)
//           );
//           setLoading(false);
//         });
//       } catch (error) {
//         console.error('Error fetching profiles:', error);
//         setLoading(false);
//       }
//     };

//     fetchProfiles();
//     return () => unsub && unsub();
//   }, [user?.uid]);

//   // Pass (left swipe)
//   const swipeLeft = async (cardIndex) => {
//     const userSwiped = profiles[cardIndex];
//     if (!userSwiped || !user?.uid) return;

//     await setDoc(
//       doc(db, 'users', user.uid, 'passes', userSwiped.id),
//       userSwiped
//     );

//     console.log(
//       `❌ Passed on ${userSwiped.displayName || userSwiped.fullName}`
//     );
//   };

//   // Like (right swipe) + check for match
//   const swipeRight = async (cardIndex) => {
//     const userSwiped = profiles[cardIndex];
//     if (!userSwiped || !user?.uid) return;

//     // Save this swipe
//     await setDoc(doc(db, 'users', user.uid, 'swipes', userSwiped.id), {
//       displayName: user.displayName || '',
//       photoURL: user.photoURL || '',
//       timestamp: serverTimestamp(),
//     });

//     // Check if they liked me before
//     const otherUserSwipeDoc = await getDoc(
//       doc(db, 'users', userSwiped.id, 'swipes', user.uid)
//     );

//     if (otherUserSwipeDoc.exists()) {
//       // It's a match!
//       const matchId = generateMatchId(user.uid, userSwiped.id);

//       await setDoc(doc(db, 'matches', matchId), {
//         users: {
//           [user.uid]: {
//             displayName: user.displayName || '',
//             photoURL: user.photoURL || '',
//           },
//           [userSwiped.id]: {
//             displayName: userSwiped.displayName || '',
//             photoURL: userSwiped.photoURL || '',
//           },
//         },
//         userIds: [user.uid, userSwiped.id],
//         timestamp: serverTimestamp(),
//       });

//       console.log("🔥 It's a match!");
//       // You can navigate to a match screen here
//       // navigation.navigate('MatchScreen', { matchedUser: userSwiped });
//     }
//   };

//   if (loading) {
//     return (
//       <View style={styles.center}>
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }

//   if (profiles.length === 0) {
//     return (
//       <View style={styles.center}>
//         <Text>No more profiles</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Swiper
//         ref={swiperRef}
//         cards={profiles}
//         renderCard={(card) =>
//           card ? (
//             <ProfileCard user={card} /> // ✅ Safe card rendering
//           ) : (
//             <View style={styles.noMoreCards}>
//               <Text>No more profiles</Text>
//             </View>
//           )
//         }
//         onSwipedLeft={swipeLeft}
//         onSwipedRight={swipeRight} // ✅ Now correctly defined
//         cardIndex={0}
//         backgroundColor="transparent"
//         stackSize={5}
//         disableTopSwipe
//         disableBottomSwipe
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f9f9f9',
//   },
//   center: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   noMoreCards: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: 400,
//   },
// });

// export default SwipeScreen;

// src/screens/SwipeScreen.js
import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
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
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../utils/firebase';
import { useAuth } from '../context/AuthContext';
import Swiper from 'react-native-deck-swiper';
import ProfileCard from '../components/ProfileCard';

// Helper: stable match id regardless of order
const generateMatchId = (id1, id2) => [id1, id2].sort().join('_');

const SwipeScreen = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const swipeRef = useRef(null);

  useEffect(() => {
    // If auth not ready yet, don't try to hit Firestore
    if (!user?.uid) return;

    let unsub;

    const fetchProfiles = async () => {
      try {
        setLoading(true);

        // Get IDs we should exclude
        const [passesSnap, swipesSnap] = await Promise.all([
          getDocs(collection(db, 'users', user.uid, 'passes')),
          getDocs(collection(db, 'users', user.uid, 'swipes')),
        ]);

        const passedIds = passesSnap.docs.map((d) => d.id);
        const swipedIds = swipesSnap.docs.map((d) => d.id);
        const excludedIds = Array.from(
          new Set([...passedIds, ...swipedIds, user.uid])
        );

        // Firestore `not-in` supports up to 10 values; we still filter fully client-side below
        const filterIds =
          excludedIds.length > 0
            ? excludedIds.slice(0, 10)
            : ['__placeholder__'];

        const q = query(
          collection(db, 'users'),
          where('__name__', 'not-in', filterIds)
        );

        unsub = onSnapshot(q, (snapshot) => {
          const incoming = snapshot.docs.map((d) => ({
            id: d.id,
            ...d.data(),
          }));
          // Final guard: exclude any IDs beyond the first 10 (client-side)
          const cleaned = incoming.filter(
            (p) => p.id !== user.uid && !excludedIds.includes(p.id)
          );
          setProfiles(cleaned);
          setLoading(false);
        });
      } catch (err) {
        console.error('Error fetching profiles:', err);
        setLoading(false);
      }
    };

    fetchProfiles();
    return () => unsub && unsub();
  }, [user?.uid]);

  // Pass (left swipe)
  const swipeLeft = async (cardIndex) => {
    const userSwiped = profiles[cardIndex];
    if (!userSwiped || !user?.uid) return;

    try {
      await setDoc(doc(db, 'users', user.uid, 'passes', userSwiped.id), {
        ...userSwiped,
        timestamp: serverTimestamp(),
      });
      console.log(
        `❌ Passed on ${
          userSwiped.displayName || userSwiped.fullName || userSwiped.id
        }`
      );
    } catch (err) {
      console.error('Error saving pass:', err);
    }
  };

  // Like (right swipe) + check for match
  const swipeRight = async (cardIndex) => {
    const userSwiped = profiles[cardIndex];
    if (!userSwiped || !user?.uid) return;

    try {
      // Save my like
      await setDoc(doc(db, 'users', user.uid, 'swipes', userSwiped.id), {
        displayName: user.displayName || '',
        photoURL: user.photoURL || '',
        timestamp: serverTimestamp(),
      });

      console.log(
        `💚 Liked ${
          userSwiped.displayName || userSwiped.fullName || userSwiped.id
        }`
      );

      // Did they like me already?
      const theyLikedMe = await getDoc(
        doc(db, 'users', userSwiped.id, 'swipes', user.uid)
      );

      if (theyLikedMe.exists()) {
        // Create match doc
        const matchId = generateMatchId(user.uid, userSwiped.id);

        // Fetch my full profile to store in match payload (auth user may not have all fields)
        const myProfileSnap = await getDoc(doc(db, 'users', user.uid));
        const myProfile = myProfileSnap.exists()
          ? { id: user.uid, ...myProfileSnap.data() }
          : {
              id: user.uid,
              displayName: user.displayName || '',
              photoURL: user.photoURL || '',
            };

        await setDoc(doc(db, 'matches', matchId), {
          users: {
            [user.uid]: myProfile,
            [userSwiped.id]: userSwiped,
          },
          userIds: [user.uid, userSwiped.id],
          timestamp: serverTimestamp(),
        });

        console.log("🔥 It's a match!");

        // If you have MatchScreen registered, you can navigate:
        navigation.navigate('MatchScreen', {
          currentUser: myProfile,
          matchedUser: userSwiped,
        });
      }
    } catch (err) {
      console.error('Error handling right swipe:', err);
    }
  };

  // Loading & empty states
  if (!user?.uid) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (profiles.length === 0) {
    return (
      <View style={styles.center}>
        <Text>No more profiles</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Swiper
        ref={swipeRef}
        cards={profiles}
        stackSize={5}
        cardIndex={0}
        backgroundColor="transparent"
        disableTopSwipe
        disableBottomSwipe
        onSwipedLeft={swipeLeft}
        onSwipedRight={swipeRight}
        onSwipedAll={() => setProfiles([])}
        renderCard={(card) =>
          card ? (
            <ProfileCard user={card} />
          ) : (
            <View style={styles.noMoreCards}>
              <Text>No more profiles</Text>
            </View>
          )
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  noMoreCards: { justifyContent: 'center', alignItems: 'center', height: 400 },
});

export default SwipeScreen;
