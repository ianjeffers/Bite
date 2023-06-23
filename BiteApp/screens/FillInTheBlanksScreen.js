import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { fillInTheBlanksScreenStyles as styles } from '../styles';
import { Button } from 'react-native-elements';

const FillInTheBlanksScreen = ({ content }) => {
  const [userAnswer, setUserAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const gameData = content;

  const handleAnswer = (answer) => {
    setUserAnswer(answer);
  };

  const handleSubmit = () => {
    if (userAnswer === gameData.answer) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  if (!gameData) {
    return <Text>No game data available.</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sentence}>{gameData.sentence.replace('_____', '________')}</Text>
      <View style={styles.wordBank}>
        {gameData.wordBank.map((word, index) => (
          <Button
            key={index}
            title={word}
            onPress={() => {
              if (!isCorrect) {
                // the button will not work if a correct answer has been submitted
                handleAnswer(word);
              }
            }}
            buttonStyle={{
              backgroundColor: userAnswer === word ? '#7c7bad' : '#f0f0f0',
              margin: 5,
            }}
            // set button background color
            titleStyle={{
              color: userAnswer === word ? '#f0f0f0' : '#000000',
            }}
            // set button text color
            disabled={isCorrect}
            // disable button if a correct answer has been submitted
          />
        ))}
      </View>
      <Button title="Submit" onPress={handleSubmit} color="#7bad9c" />
      {isCorrect !== null && (
        <Text style={isCorrect ? styles.correct : styles.incorrect}>
          {isCorrect ? 'Correct!' : 'Incorrect, please try again.'}
        </Text>
      )}
    </View>
  );
};

export default FillInTheBlanksScreen;
