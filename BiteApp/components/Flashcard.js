import React, { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { FlashcardStyles as styles } from '../styles';

const Flashcard = ({ question, answer }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <TouchableOpacity style={styles.card} onPress={() => setShowAnswer(!showAnswer)}>
      <Text style={styles.text}>{showAnswer ? answer : question}</Text>
    </TouchableOpacity>
  );
};

export default Flashcard;
