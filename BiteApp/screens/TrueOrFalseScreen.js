import React, { useState } from 'react';
import { View, ActivityIndicator, Text, Button } from 'react-native';
import { trueOrFalseScreenStyles as styles } from '../styles';
import LikeButton from '../components/LikeButton';

const TrueOrFalseScreen = ({ content, onLike, isContentLiked, validContents, index: currentIndex }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [answerStatus, setAnswerStatus] = useState(null);

  const questions = content.content;

  if (!questions || questions.length === 0 || !questions[currentQuestionIndex]) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const handleAnswer = (answer) => {
    if (answer === questions[currentQuestionIndex].is_true) {
      setScore(score + 1);
      setAnswerStatus('correct');
    } else {
      setAnswerStatus('wrong');
    }

    setTimeout(() => {
      setAnswerStatus(null); 
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setGameOver(true);
      }
    }, 1000);
  };

  if (gameOver) {
    return (
      <View>      
        <LikeButton onLike={() => onLike(validContents[currentIndex])} isLiked={isContentLiked(validContents[currentIndex])} />
        <View style={styles.wrapper}>
          <Text style={styles.finalScoreText}>Game over! Your final score: {score}/{questions.length}</Text>
          <Button title="Play again" onPress={() => {
            setScore(0);
            setCurrentQuestionIndex(0);
            setGameOver(false);
          }} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <Text style={[styles.questionText, answerStatus === 'correct' ? styles.correctAnswer : (answerStatus === 'wrong' ? styles.wrongAnswer : {})]}>{questions[currentQuestionIndex].statement}</Text>
      <Button title="True" onPress={() => handleAnswer(true)} />
      <Button title="False" onPress={() => handleAnswer(false)} />
      <Text style={styles.scoreText}>Score: {score}/{questions.length}</Text>
    </View>
  );
};

export default TrueOrFalseScreen;
