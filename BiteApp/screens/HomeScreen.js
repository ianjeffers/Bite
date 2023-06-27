import React from 'react';
import { View } from 'react-native';
import BottomNavBar from '../components/BottomNavBar';
import { CommonStyles as styles } from '../styles';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={[styles.phoneScreen, {borderWidth: 1, borderColor: '#000'}]}>
        <BottomNavBar/>
      </View>
    </View>
  );
}

export default HomeScreen;
