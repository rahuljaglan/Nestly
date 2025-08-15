// screens/MatchScreen.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const MatchScreen = () => {
  const navigation = useNavigation();
  const { currentUser, matchedUser } = useRoute().params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎉 It's a Match!</Text>
      <View style={styles.profiles}>
        <Image source={{ uri: currentUser.photoURL }} style={styles.image} />
        <Image source={{ uri: matchedUser.photoURL }} style={styles.image} />
      </View>
      <Text style={styles.subtitle}>
        You and {matchedUser.displayName} like each other.
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Chat')}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Start Chatting</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 24 },
  profiles: { flexDirection: 'row', gap: 20, marginBottom: 24 },
  image: { width: 120, height: 120, borderRadius: 60 },
  subtitle: { fontSize: 18, color: '#666', marginBottom: 32 },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 32,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default MatchScreen;
