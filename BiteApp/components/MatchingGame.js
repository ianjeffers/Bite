import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { matchingGameStyles as styles } from '../styles';

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const MatchingGame = ({ content: gameData }) => {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correctMatches, setCorrectMatches] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameOver, setGameOver] = useState(false);

  const [matchPairs, setMatchPairs] = useState([]);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);

  useEffect(() => {
    setMatchPairs(shuffleArray(gameData));
    setShuffledAnswers(shuffleArray([...gameData]));
  }, []);

  useEffect(() => {
    if (!timeLeft || (score === matchPairs.length && score != 0)) {
      setGameOver(true);
      return;
    }
    const timerId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, [timeLeft, correctMatches.length, matchPairs.length]);

  const handleQuestionPress = (question) => {
    if (correctMatches.includes(question)) return;
    setSelectedQuestion(question);
    if (selectedAnswer && question.Answer === selectedAnswer) {
      setCorrectMatches(prevCorrectMatches => [...prevCorrectMatches, question]);
      setSelectedQuestion(null);
      setSelectedAnswer(null);
      setScore(score + 1);
    }
  };

  const handleAnswerPress = (answer) => {
    setSelectedAnswer(answer);
    if (selectedQuestion && selectedQuestion.Answer === answer) {
      setCorrectMatches(prevCorrectMatches => [...prevCorrectMatches, selectedQuestion]);
      setSelectedQuestion(null);
      setSelectedAnswer(null);
      setScore(score + 1);
    }
  };

  return (
    <View style={styles.container}>
      {gameOver ? 
        <View style={styles.gameOverContainer}>
          <Text style={styles.gameOverText}>Game Over!</Text>
          <Text style={styles.scoreText}>Final Score: {score}/{shuffledAnswers.length}</Text>
        </View>
        :
        <View>
        <Text style={styles.timerText}>Time left: {timeLeft}</Text>
        <Text style={styles.scoreText}>Score: {score}</Text>
        <View style={styles.gameContainer}>
          <View style={styles.column}>
            {matchPairs.map((pair) => (
              <TouchableOpacity
                key={pair.Question}
                onPress={() => handleQuestionPress(pair)}
                style={[styles.button, correctMatches.includes(pair) && styles.correct]}
                disabled={correctMatches.includes(pair)}
              >
                <Text style={styles.text}>{pair.Question}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.column}>
            {shuffledAnswers.map((pair) => (
                <TouchableOpacity
                  key={pair.Answer}
                  onPress={() => handleAnswerPress(pair.Answer)}
                  style={[styles.button, correctMatches.some(match => match.Answer === pair.Answer) && styles.correct]}
                  disabled={correctMatches.some(match => match.Answer === pair.Answer)}
                >
                  <Text style={styles.text}>{pair.Answer}</Text>
                </TouchableOpacity>
              ))}
          </View>
        </View>
        </View>
      }
    </View>
  );
};

export default MatchingGame;
