import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const ProfileCard = ({ user }) => {
  const photoURL = user?.photoURL;

  return (
    <View style={styles.card}>
      <Image
        source={
          photoURL
            ? { uri: photoURL }
            : { uri: 'https://www.w3schools.com/howto/img_avatar.png' }
        }
        style={styles.image}
      />

      <Text style={styles.name}>
        {user?.fullName || 'Unknown'}, {user?.age || 'N/A'}
      </Text>

      {user?.location && (
        <Text style={styles.location}>📍 {user.location}</Text>
      )}

      <Text style={styles.sectionTitle}>Bio</Text>
      <Text style={styles.text}>{user?.bio || 'No bio available'}</Text>

      <Text style={styles.sectionTitle}>Budget</Text>
      <Text style={styles.text}>
        ₹{user?.budget ? `${user.budget} / month` : 'Not specified'}
      </Text>

      <Text style={styles.sectionTitle}>Move-in Date</Text>
      <Text style={styles.text}>{user?.moveInDate || 'Not specified'}</Text>

      <Text style={styles.sectionTitle}>Lifestyle</Text>
      <Text style={styles.text}>{user?.lifestyle || 'Not specified'}</Text>

      <Text style={styles.sectionTitle}>Interests</Text>
      <Text style={styles.text}>
        {user?.interests?.length ? user.interests.join(', ') : 'Not specified'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    alignItems: 'center',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
    backgroundColor: '#eee',
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
  },
  location: {
    fontSize: 16,
    color: '#888',
    marginBottom: 10,
  },
  sectionTitle: {
    fontWeight: '600',
    marginTop: 10,
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
    color: '#333',
  },
});

export default ProfileCard;
