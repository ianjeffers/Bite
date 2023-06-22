// components/Quiz.js
import React from 'react';
import { Text, Button, View } from 'react-native';

const Quiz = ({ question, options, correctOption, onAnswer }) => {
  return (
    <View>
      <Text>{question}</Text>
      {options.map((option, index) => (
        <Button
          key={index}
          title={option}
          onPress={() => onAnswer(option === correctOption)}
        />
      ))}
    </View>
  );
};

export default Quiz;
