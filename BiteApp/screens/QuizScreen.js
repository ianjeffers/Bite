import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { Card } from 'react-native-elements';
import { quizScreenStyles as styles } from '../styles';

const QuizScreen = () => {
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showScore, setShowScore] = useState(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.post('http://localhost:5000/quiz', {
          topic: 'Minecraft' // TODO -> Generate from user context/feed
        });
        setQuiz(response.data.quiz);
      } catch (error) {
        console.error('Failed to fetch quiz:', error);
      }
    };

    fetchQuiz();
  }, []);

  useEffect(() => {
    if (userAnswers.length === quiz?.length) {
      setShowScore(true);
    }
  }, [userAnswers, quiz]);

  if (!quiz) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const checkAnswer = (q, index) => {
    const userAnswer = { question: q.question, answer: q.options[index], correctAnswer: q.correctOption };
    setUserAnswers([...userAnswers, userAnswer]);

    if (q.options[index] === q.correctOption) {
      setScore(score + 1);
    }

    if (currentQuestion < quiz.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  if (showScore) {
    return (
      <View style={styles.wrapper}>
        <Text>Your score is: {score}/{quiz.length}</Text>
        {userAnswers.map((userAnswer, index) => (
          <Card key={index}>
            <Card.Title>{userAnswer.question}</Card.Title>
            <Text>Your answer: {userAnswer.answer}</Text>
            {userAnswer.answer !== userAnswer.correctAnswer && <Text>Correct answer: {userAnswer.correctAnswer}</Text>}
          </Card>
        ))}
        <TouchableOpacity style={styles.button} onPress={() => {
          setCurrentQuestion(0);
          setScore(0);
          setUserAnswers([]);
          setShowScore(false);
        }}>
          <Text style={styles.buttonText}>Restart Quiz</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const q = quiz[currentQuestion];

  return (
    <View style={styles.wrapper}>
      <Card>
        <Card.Title>{q.question}</Card.Title>
        {q.options.map((option, index) => (
          <TouchableOpacity key={index} style={styles.option} onPress={() => checkAnswer(q, index)}>
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </Card>
    </View>
  );
};

export default QuizScreen;