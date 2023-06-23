import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import MatchingGame from '../components/MatchingGame';

const MatchingGameScreen = ({ content }) => {
  if (!content) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View>
      <MatchingGame content={content} />
    </View>
  );
};

export default MatchingGameScreen;
