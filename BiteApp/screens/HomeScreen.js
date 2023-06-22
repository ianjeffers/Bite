// screens/HomeScreen.js
import React from 'react';
import { View } from 'react-native';
import Swiper from 'react-native-swiper/src';
import FlashcardScreen from './FlashcardScreen';
import QuizScreen from './QuizScreen';
import { homeScreenStyles as styles } from '../styles';
import MatchingGameScreen from '../screens/MatchingGameScreen';
import FillInTheBlanksScreen from '../screens/FillInTheBlanksScreen';
import TrueOrFalseScreen from '../screens/TrueOrFalseScreen';
import VideoContentScreen from '../screens/VideoContentScreen';

const screens = [
  VideoContentScreen,
  TrueOrFalseScreen,
  FillInTheBlanksScreen,
  MatchingGameScreen,
  FlashcardScreen,
  QuizScreen,
];

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.phoneScreen}>
        <Swiper showsPagination={false} loop={false} showsButtons={false} horizontal={false}>
          {screens.map((ScreenComponent, index) => (
            <ScreenComponent key={index} />
          ))}
        </Swiper>
      </View>
    </View>
  );
};

export default HomeScreen;
