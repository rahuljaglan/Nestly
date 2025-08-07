// src/screens/CompleteProfileScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import { db } from '../utils/firebase';
import { doc, setDoc } from 'firebase/firestore';

const CompleteProfileScreen = () => {
  const { user, setProfileComplete } = useAuth();
  const navigation = useNavigation();

  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [bio, setBio] = useState('');

  const handleSubmit = async () => {
    if (!fullName || !age || !gender || !bio) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    try {
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        fullName,
        age: Number(age),
        gender,
        bio,
        email: user.email,
        createdAt: new Date(),
        profileComplete: true, // 🟢 This flag is important
      });

      // 🔁 Update profileComplete in context
      if (setProfileComplete) {
        setProfileComplete(true);
      }

      // Navigate to Home screen
      // navigation.replace('Home');
    } catch (err) {
      console.error('Error saving profile:', err);
      Alert.alert('Error', 'Failed to save profile');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Complete Your Profile</Text>

      <TextInput
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
        style={styles.input}
      />
      <TextInput
        placeholder="Age"
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
        style={styles.input}
      />
      <TextInput
        placeholder="Gender"
        value={gender}
        onChangeText={setGender}
        style={styles.input}
      />
      <TextInput
        placeholder="Short Bio"
        multiline
        numberOfLines={3}
        value={bio}
        onChangeText={setBio}
        style={[styles.input, { height: 80 }]}
      />

      <Button title="Save Profile" onPress={handleSubmit} />
    </ScrollView>
  );
};

export default CompleteProfileScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 6,
    marginBottom: 15,
  },
});
