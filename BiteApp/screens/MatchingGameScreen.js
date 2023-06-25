import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import MatchingGame from '../components/MatchingGame';

const MatchingGameScreen = ({ content }) => {
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
    </View>
  );
};

export default MatchingGameScreen;
