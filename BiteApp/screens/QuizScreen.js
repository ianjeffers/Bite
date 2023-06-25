import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import Quiz from '../components/Quiz';

const QuizScreen = ({ content }) => {
  if (!content) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View>
      <Quiz content={content} />
    </View>
  );
};

export default QuizScreen;
