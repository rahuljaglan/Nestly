// src/screens/EditProfileScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { storage, db } from '../utils/firebase';
import { useAuth } from '../context/AuthContext';
import uuid from 'uuid';

const EditProfileScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [bio, setBio] = useState('');
  const [gender, setGender] = useState('');
  const [roommateGender, setRoommateGender] = useState('');
  const [city, setCity] = useState('');
  const [budget, setBudget] = useState('');
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadProfile = async () => {
    if (
      !name ||
      !age ||
      !bio ||
      !gender ||
      !roommateGender ||
      !city ||
      !budget ||
      !image
    ) {
      Alert.alert('Error', 'Please fill all fields and upload a photo');
      return;
    }

    setUploading(true);
    try {
      const imageId = uuid.v4();
      const storageRef = ref(storage, `profilePictures/${user.uid}/${imageId}`);
      const img = await fetch(image);
      const blob = await img.blob();
      await uploadBytes(storageRef, blob);
      const imageUrl = await getDownloadURL(storageRef);

      const profileData = {
        name,
        age,
        bio,
        gender,
        roommateGender,
        city,
        budget,
        photoUrl: imageUrl,
        uid: user.uid,
        timestamp: Date.now(),
      };

      await setDoc(doc(db, 'users', user.uid), profileData);

      Alert.alert('Success', 'Profile updated!');
      navigation.replace('Home'); // Navigate to swipe screen/home
    } catch (error) {
      Alert.alert('Upload Failed', error.message);
    }
    setUploading(false);
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <TouchableOpacity onPress={pickImage}>
        {image ? (
          <Image
            source={{ uri: image }}
            style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              alignSelf: 'center',
            }}
          />
        ) : (
          <View
            style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              backgroundColor: '#ccc',
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text>Upload Photo</Text>
          </View>
        )}
      </TouchableOpacity>

      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={{ marginVertical: 8, borderBottomWidth: 1 }}
      />
      <TextInput
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
        style={{ marginVertical: 8, borderBottomWidth: 1 }}
      />
      <TextInput
        placeholder="Bio"
        value={bio}
        onChangeText={setBio}
        multiline
        style={{ marginVertical: 8, borderBottomWidth: 1 }}
      />
      <TextInput
        placeholder="Gender"
        value={gender}
        onChangeText={setGender}
        style={{ marginVertical: 8, borderBottomWidth: 1 }}
      />
      <TextInput
        placeholder="Preferred Roommate Gender"
        value={roommateGender}
        onChangeText={setRoommateGender}
        style={{ marginVertical: 8, borderBottomWidth: 1 }}
      />
      <TextInput
        placeholder="City"
        value={city}
        onChangeText={setCity}
        style={{ marginVertical: 8, borderBottomWidth: 1 }}
      />
      <TextInput
        placeholder="Budget"
        value={budget}
        onChangeText={setBudget}
        keyboardType="numeric"
        style={{ marginVertical: 8, borderBottomWidth: 1 }}
      />

      <Button
        title={uploading ? 'Uploading...' : 'Save Profile'}
        onPress={uploadProfile}
        disabled={uploading}
      />
    </ScrollView>
  );
};

export default EditProfileScreen;
