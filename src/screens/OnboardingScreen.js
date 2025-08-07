// import React, { useRef, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   Dimensions,
//   TouchableOpacity,
// } from 'react-native';

// const { width } = Dimensions.get('window');

// const slides = [
//   {
//     key: '1',
//     title: 'Find Your Perfect Roommate',
//     description:
//       'Swipe, match, and move in with people who truly vibe with you.',
//   },
//   {
//     key: '2',
//     title: 'Verified Profiles',
//     description:
//       'Profiles you can trust — verified social links and background checks.',
//   },
//   {
//     key: '3',
//     title: 'Live Together Better',
//     description:
//       'Smart roommate matching based on habits, budget, and lifestyle.',
//   },
// ];

// const OnboardingScreen = ({ onFinish }) => {
//   const flatListRef = useRef(null);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const handleNext = () => {
//     if (currentIndex < slides.length - 1) {
//       flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
//     } else {
//       onFinish();
//     }
//   };

//   const handleSkip = () => {
//     onFinish();
//   };

//   const updateCurrentIndex = (e) => {
//     const index = Math.round(e.nativeEvent.contentOffset.x / width);
//     setCurrentIndex(index);
//   };

//   const renderItem = ({ item }) => (
//     <View style={styles.slide}>
//       <Text style={styles.title}>{item.title}</Text>
//       <Text style={styles.description}>{item.description}</Text>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <FlatList
//         ref={flatListRef}
//         data={slides}
//         renderItem={renderItem}
//         horizontal
//         pagingEnabled
//         showsHorizontalScrollIndicator={false}
//         onScroll={updateCurrentIndex}
//         keyExtractor={(item) => item.key}
//       />

//       <View style={styles.dotsContainer}>
//         {slides.map((_, index) => (
//           <View
//             key={index}
//             style={[styles.dot, currentIndex === index ? styles.activeDot : {}]}
//           />
//         ))}
//       </View>

//       <View style={styles.buttonsContainer}>
//         <TouchableOpacity onPress={handleSkip}>
//           <Text style={styles.skipText}>Skip</Text>
//         </TouchableOpacity>

//         <TouchableOpacity onPress={handleNext}>
//           <Text style={styles.nextText}>
//             {currentIndex === slides.length - 1 ? 'Get Started' : 'Next'}
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#fff', paddingBottom: 40 },
//   slide: {
//     width,
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 30,
//   },
//   title: {
//     fontSize: 26,
//     fontWeight: 'bold',
//     marginBottom: 15,
//     textAlign: 'center',
//   },
//   description: {
//     fontSize: 16,
//     textAlign: 'center',
//     color: '#555',
//   },
//   dotsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginTop: 20,
//   },
//   dot: {
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: '#ccc',
//     marginHorizontal: 5,
//   },
//   activeDot: {
//     backgroundColor: '#000',
//     width: 10,
//     height: 10,
//   },
//   buttonsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: 30,
//     marginTop: 30,
//   },
//   skipText: {
//     fontSize: 16,
//     color: '#999',
//   },
//   nextText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#000',
//   },
// });

// export default OnboardingScreen;
