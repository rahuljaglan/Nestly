import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { db } from '../utils/firebase';
import { doc, getDoc } from 'firebase/firestore';

const ProfileScreen = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProfile(docSnap.data());
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  }

  if (!profile) {
    return (
      <Text style={{ marginTop: 50, textAlign: 'center' }}>
        Profile not found.
      </Text>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{profile.fullName}</Text>
      <Text style={styles.item}>Age: {profile.age}</Text>
      <Text style={styles.item}>Gender: {profile.gender}</Text>
      <Text style={styles.item}>Email: {profile.email}</Text>
      <Text style={styles.bio}>{profile.bio}</Text>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 15,
  },
  item: {
    fontSize: 16,
    marginBottom: 10,
  },
  bio: {
    fontSize: 15,
    fontStyle: 'italic',
    marginTop: 20,
  },
});
