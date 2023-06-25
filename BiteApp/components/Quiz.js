import React, { useState, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity, Animated } from 'react-native';
import { quizStyles as styles } from '../styles';

const Quiz = ({ content }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const fadeAnim = new Animated.Value(0);  

  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true
      }
    ).start();
  }, []);

  const checkAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < content.content.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
  };
  
  return (
    <Animated.View style={[styles.wrapper, {opacity: fadeAnim}]}>
      {showScore ? (
        <View>
          <Text style={styles.scoreText}>Wow! You scored {score}/{content.content.length}</Text>
          <TouchableOpacity style={styles.button} onPress={restartQuiz}>
            <Text style={styles.buttonText}>Restart Quiz</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <Text style={styles.questionText}>{content.content[currentQuestion].question}</Text>
          {content.content[currentQuestion].options.map((option, index) => (
            <TouchableOpacity key={index} style={styles.option} onPress={() => checkAnswer(option === content.content[currentQuestion].correctOption)}>
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </Animated.View>
  );
};

export default Quiz;
