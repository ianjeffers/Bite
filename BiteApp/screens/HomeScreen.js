// screens/HomeScreen.js

import React from 'react';
import { View } from 'react-native';
import BottomNavBar from '../components/BottomNavBar';
import { homeScreenStyles as styles } from '../styles';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.phoneScreen}>
        <BottomNavBar/>
      </View>
    </View>
  );
}

export default HomeScreen;
