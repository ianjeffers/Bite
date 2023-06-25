import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import MatchingGame from '../components/MatchingGame';
import LikeButton from '../components/LikeButton';

const MatchingGameScreen = ({ content, onLike, isContentLiked, validContents, index: currentIndex }) => {
  if (!content) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  // Access the Questions array for mapping
  const gameData = content.content.Questions.map(item => ({
    Question: item.Question,
    Answer: item.Answer
  }));

  return (
    <View>
      <MatchingGame content={gameData} />
      <LikeButton onLike={() => onLike(validContents[currentIndex])} isLiked={isContentLiked(validContents[currentIndex])} />
    </View>
  );
};

export default MatchingGameScreen;
