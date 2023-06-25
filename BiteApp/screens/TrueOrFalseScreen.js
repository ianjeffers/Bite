import React, { useState } from 'react';
import { View, ActivityIndicator, Text, Button } from 'react-native';
import { trueOrFalseScreenStyles as styles } from '../styles';

const TrueOrFalseScreen = ({ content }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  content = content.content
  if (!content || content.length === 0 || !content[currentQuestionIndex]) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }


  const handleAnswer = (answer) => {
    if (answer === content[currentQuestionIndex].is_true) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < content.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setGameOver(true);
    }
  };

  if (gameOver) {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.finalScoreText}>Game over! Your final score: {score}/{content.length}</Text>
        <Button title="Play again" onPress={() => {
          setScore(0);
          setCurrentQuestionIndex(0);
          setGameOver(false);
        }} />
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <Text style={styles.questionText}>{content[currentQuestionIndex].statement}</Text>
      <Button title="True" onPress={() => handleAnswer(true)} />
      <Button title="False" onPress={() => handleAnswer(false)} />
      <Text style={styles.scoreText}>Score: {score}/{content.length}</Text>
    </View>
  );
};

export default TrueOrFalseScreen;