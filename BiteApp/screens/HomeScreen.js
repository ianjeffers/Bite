import React, { useContext } from 'react';
import { View } from 'react-native';
import Swiper from 'react-native-swiper/src';
import FlashcardScreen from './FlashcardScreen';
import QuizScreen from './QuizScreen';
import { homeScreenStyles as styles } from '../styles';
import MatchingGameScreen from '../screens/MatchingGameScreen';
import FillInTheBlanksScreen from '../screens/FillInTheBlanksScreen';
import TrueOrFalseScreen from '../screens/TrueOrFalseScreen';
import VideoContentScreen from '../screens/VideoContentScreen';
import ProfileScreen from '../screens/ProfileScreen';
import UserContext from '../contexts/UserContext';
import MindMapScreen from '../screens/MindMapScreen';

const screens = [
  VideoContentScreen,
  TrueOrFalseScreen,
  // FillInTheBlanksScreen,
  // MatchingGameScreen,
  // FlashcardScreen,
  // QuizScreen,
];

const HomeScreen = () => {
  const { userContext, setUserContext } = useContext(UserContext);

  const handleLike = (content) => {
    // Add the content to the user's history
    setUserContext({ type: 'ADD_TO_HISTORY', payload: content });

    // Add the content's topic to the user's preferences
    const newPreferences = [...userContext.preferences, content.topic];
    setUserContext({ type: 'SET_PREFERENCES', payload: newPreferences });
  };

  const handleDislike = (content) => {
    // Add the content to the user's history
    setUserContext({ type: 'ADD_TO_HISTORY', payload: content });
  };

  return (
    <View style={styles.container}>
      <View style={styles.phoneScreen}>
        <Swiper showsPagination={false} loop={false} showsButtons={false} horizontal={false}>
          {screens.map((ScreenComponent, index) => (
            <ScreenComponent key={index} onLike={handleLike} onDislike={handleDislike} />
          ))}
        </Swiper>
      </View>
    </View>
  );
};

export default HomeScreen;
