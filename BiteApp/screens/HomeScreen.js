// screens/HomeScreen.js
import React from 'react';
import { View } from 'react-native';
import Swiper from 'react-native-swiper/src';
import FlashcardScreen from './FlashcardScreen';
import { homeScreenStyles as styles } from '../styles';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.phoneScreen}>
        <Swiper showsPagination={false} loop={false} showsButtons={false} horizontal={false}>
          <FlashcardScreen />
          <FlashcardScreen />
          <FlashcardScreen />
          <FlashcardScreen />
        </Swiper>
      </View>
    </View>
  );
};

export default HomeScreen;
