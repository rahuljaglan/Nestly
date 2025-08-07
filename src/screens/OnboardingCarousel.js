import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const slides = [
  {
    key: '1',
    title: 'Welcome to Nestly',
    description:
      'Find your ideal roommate with trust, vibes, and verified profiles.',
  },
  {
    key: '2',
    title: 'Verified Profiles',
    description: 'Every roommate profile is verified for trust and safety.',
  },
  {
    key: '3',
    title: 'Start Matching',
    description: 'Sign up now and start swiping through roommate profiles!',
  },
];

const OnboardingCarousel = ({ navigation }) => {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = async () => {
    if (currentIndex < slides.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      flatListRef.current.scrollToIndex({ index: nextIndex });
    } else {
      await AsyncStorage.setItem('alreadyLaunched', 'true');
      navigation.replace('Auth'); // ✅ Let RootNavigator handle user state
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  const handleScroll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        horizontal
        pagingEnabled
        data={slides}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
      />
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>
          {currentIndex === slides.length - 1 ? 'Get Started' : 'Next'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', backgroundColor: '#fff' },
  slide: {
    width,
    padding: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: { fontSize: 26, fontWeight: 'bold', textAlign: 'center' },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    color: '#444',
  },
  button: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 10,
    margin: 20,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});

export default OnboardingCarousel;
