import React from 'react';
import { View, Text, Button } from 'react-native';
import { useUser, UserButton, useAuth } from '@clerk/clerk-react';
import { profileStyles as styles } from '../styles.js';

function ProfileScreen() {
  // Get current user data using Clerk's useUser hook
  const { user, isSignedIn, isLoaded } = useUser();
  const { signOutAll } = useAuth();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  return (
    <View style={styles.profileContainer}>
      <Text style={styles.header}>Profile Page</Text>
      <View style={styles.profileInfo}>
        <Text style={styles.profileText}><strong>First Name:</strong> {user.firstName}</Text>
        <Text style={styles.profileText}><strong>Last Name:</strong> {user.lastName}</Text>
        <Text style={styles.profileText}><strong>Email:</strong> {user.emailAddresses[0]?.emailAddress}</Text>
      </View>
      <Button style={styles.signOutBtn} onPress={signOutAll} title="Sign Out" color={styles.signOutBtn.backgroundColor}/>
    </View>
  );
}

export default ProfileScreen;
