// screens/TrueOrFalseScreen.js
import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, Text, Button } from 'react-native';
import axios from 'axios';
import { trueOrFalseScreenStyles as styles } from '../styles';

const TrueOrFalseScreen = () => {
  const [questions, setQuestions] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.post('http://localhost:5000/trueorfalse', {
          topic: 'Hackathon' // TODO -> Generate from user context/feed
        });
        setQuestions(response.data.questions);
      } catch (error) {
        console.error('Failed to fetch questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  if (!questions) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = (answer) => {
    if (answer === currentQuestion.is_true) {
      setScore(score + 1);
    }

    // Go to the next question or finish the game if this was the last question
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setGameOver(true);
    }
  };

  if (gameOver) {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.finalScoreText}>Game over! Your final score: {score}/{questions.length}</Text>
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
      <Text style={styles.questionText}>{currentQuestion.statement}</Text>
      <Button title="True" onPress={() => handleAnswer(true)} />
      <Button title="False" onPress={() => handleAnswer(false)} />
      <Text style={styles.scoreText}>Score: {score}/{currentQuestionIndex + 1}</Text>
    </View>
  );
};

export default TrueOrFalseScreen;
