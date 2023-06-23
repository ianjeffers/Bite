// screens/FlashcardScreen.js
import React, { useState, useEffect } from 'react';
import Swiper from 'react-native-swiper/src';
import { View, ActivityIndicator } from 'react-native';
import Flashcard from '../components/Flashcard';
import { flashcardScreenStyles as styles } from '../styles';

const FlashcardScreen = ({ content }) => {
  if (!content) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.wrapper}>
      <Swiper showsPagination={true} loop={false} showsButtons={false}>
        {content.map((card, index) => (
          <Flashcard key={index} question={card.Question} answer={card.Answer} />
        ))}
      </Swiper>
    </View>
  );
};

export default FlashcardScreen;
