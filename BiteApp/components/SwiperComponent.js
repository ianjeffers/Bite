import React, { useState, useEffect, useContext } from 'react';
import { ActivityIndicator, View } from 'react-native';
import Swiper from 'react-native-swiper/src';
import UserContext from '../contexts/UserContext';

import FillInTheBlanksScreen from '../screens/FillInTheBlanksScreen';
import FlashcardScreen from '../screens/FlashcardScreen';
import MatchingGameScreen from '../screens/MatchingGameScreen';
import QuizScreen from '../screens/QuizScreen';
import TrueOrFalseScreen from '../screens/TrueOrFalseScreen';
import VideoContentScreen from '../screens/VideoContentScreen';
import LikeButton from './LikeButton';

const screenMap = {
  'blanks': FillInTheBlanksScreen,
  'flashcard': FlashcardScreen,
  'matching': MatchingGameScreen,
  'quiz': QuizScreen,
  'trueorfalse': TrueOrFalseScreen,
  'video': VideoContentScreen,
};


const SwiperComponent = ({ contents }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const { userContext, setUserContext } = useContext(UserContext);

  const isContentLiked = (content) => {
    return userContext.likedContents?.some(likedContent => likedContent.id === content.id);
  };

  const onLike = async (content) => {
    setUserContext({ type: 'ADD_PREFERRED_TOPIC', payload: content.topic });
    setUserContext({ type: 'TOGGLE_CONTENT_LIKE', payload: content });
  };

  useEffect(() => {
    setIsLiked(false);
  }, [currentIndex]);

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

  const validContents = Array.isArray(contents) ? contents.filter(content => content !== null) : [];

  return (
    <View style={{ flex: 1 }}>
      <Swiper
        showsPagination={false}
        loop={false}
        showsButtons={false}
        horizontal={false}
        onIndexChanged={(index) => {
          setCurrentIndex(index);
        }}
      >
        {validContents.map((content, index) => {
          if (isEmptyContent(content)) {
            return (
                  <ActivityIndicator key={index}/>
            );
          }
          
          const ScreenComponent = screenMap[content.type];
          if (!ScreenComponent) {
            console.warn(`No screen registered for type ${content.type}`);
            return (
              <ActivityIndicator key={index}/>
            );
          }

          return (
            <ScreenComponent 
              content={content} 
              onLike={onLike}
              isContentLiked={isContentLiked}
              validContents={validContents}
              index={index}
              key={index} 
            />
          );
        })}
      </Swiper>
    </View>
  );
}

export default SwiperComponent;