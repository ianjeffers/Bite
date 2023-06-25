import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { useUser, UserButton, useAuth, SignOutButton } from '@clerk/clerk-react';
import { profileStyles as styles } from '../styles.js';
import UserContext from '../contexts/UserContext';

function ProfileScreen() {
  const { userContext, setUserContext } = useContext(UserContext);
  const { user, isSignedIn, isLoaded } = useUser();
  const { signOutAll } = useAuth();

  const handleReset = () => {
    setUserContext({ type: 'RESET' });
  }

  if (!isLoaded) {
    return <View><Text>Loading...</Text></View>;
  }

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  return (
    <View style={styles.profileContainer}>
      <Text style={styles.header}>Profile Page</Text>
      <View style={styles.profileInfo}>
        <Text style={styles.profileText}><strong>Topics of Interest:</strong> {userContext.preferences.join(', ')}</Text>
        <Text style={styles.profileText}><strong>Skills:</strong> {Object.entries(userContext.skills).map(([key, value]) => `${key}: ${value}`).join(', ')}</Text>
      </View>
      <Button
        title="Reset Profile"
        onPress={handleReset}
        style={styles.resetBtn}
      />
      <SignOutButton style={styles.signOutBtn}/>
    </View>
  );
}

export default ProfileScreen;
