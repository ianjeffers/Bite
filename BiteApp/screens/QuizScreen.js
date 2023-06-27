import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import Quiz from '../components/Quiz';
import LikeButton from '../components/LikeButton';
import { CommonStyles as styles } from '../styles';

const QuizScreen = ({ content, onLike, isContentLiked, validContents, index: currentIndex }) => {
  if (!content) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={[styles.phoneScreen, {paddingTop: '20%'}]}>
      <LikeButton onLike={() => onLike(validContents[currentIndex])} isLiked={isContentLiked(validContents[currentIndex])} />
      <Quiz content={content} />
    </View>
  );
};

export default QuizScreen;
