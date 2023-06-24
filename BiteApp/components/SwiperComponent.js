import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import Swiper from 'react-native-swiper/src';

import FillInTheBlanksScreen from '../screens/FillInTheBlanksScreen';
import FlashcardScreen from '../screens/FlashcardScreen';
import MatchingGameScreen from '../screens/MatchingGameScreen';
import QuizScreen from '../screens/QuizScreen';
import TrueOrFalseScreen from '../screens/TrueOrFalseScreen';
import VideoContentScreen from '../screens/VideoContentScreen';

const screenMap = {
  'blanks': FillInTheBlanksScreen,
  'flashcard': FlashcardScreen,
  'matching': MatchingGameScreen,
  'quiz': QuizScreen,
  'trueorfalse': TrueOrFalseScreen,
  'video': VideoContentScreen,
};

const SwiperComponent = ({ contents, onLike }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if(currentIndex === contents.length - 1) {
      // You can load the next content here
    }
  }, [currentIndex, contents.length]);

  const isEmptyContent = (content) => {
    if (typeof content === 'string') {
      return content === '';
    }
    if (Array.isArray(content)) {
      return content.length === 0;
    }
    if (typeof content === 'object' && content !== null) {
      return Object.keys(content).length === 0;
    }
    return false;
  }

  return (
    <Swiper
      showsPagination={false}
      loop={false}
      showsButtons={false}
      horizontal={false}
      onIndexChanged={(index) => {
        setCurrentIndex(index);
      }}
    >
      {contents.map((content, index) => {
        if (isEmptyContent(content)) {
          return (
                <ActivityIndicator key={index}/>
          );
        }
        
        const ScreenComponent = screenMap[content.type];
        if (!ScreenComponent) {
          console.warn(`No screen registered for type ${content.type}`);
          return null;
        }

        return (
          <ScreenComponent 
            content={content} 
            onLike={onLike} 
            key={index} 
          />
        );
      })}
    </Swiper>
  );
}

export default SwiperComponent;