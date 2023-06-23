import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { matchingGameStyles as styles } from '../styles';

const MatchingGame = ({ content }) => {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correctMatches, setCorrectMatches] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameOver, setGameOver] = useState(false);
  
  const matchPairs = content.Questions; // Update this line to use new content format

  const shuffledAnswers = React.useMemo(() => matchPairs.sort(() => Math.random() - 0.5), [matchPairs]);

  useEffect(() => {
    if (!timeLeft || score === matchPairs.length) {
      setGameOver(true);
      return;
    }
    const timerId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, [timeLeft, score, matchPairs.length]);

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