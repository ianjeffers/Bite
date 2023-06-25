import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import MatchingGame from '../components/MatchingGame';
import LikeButton from '../components/LikeButton';
import { homeScreenStyles as styles } from '../styles';

const MatchingGameScreen = ({ content, onLike, isContentLiked, validContents, index: currentIndex }) => {
  if (!content) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Access the Questions array for mapping
  const gameData = content.content.Questions.map(item => ({
    Question: item.Question,
    Answer: item.Answer
  }));

  return (
    <View style={styles.container}>
      <View style={styles.phoneScreen}>
        <MatchingGame content={gameData} />
        <LikeButton 
          onLike={() => onLike(validContents[currentIndex])} 
          isLiked={isContentLiked(validContents[currentIndex])} 
          style={styles.likeButtonContainer}
        />
      </View>
    </View>
  );
};

export default MatchingGameScreen;
