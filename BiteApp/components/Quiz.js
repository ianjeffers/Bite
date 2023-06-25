import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

const Quiz = ({ content }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

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
    <View>
      {showScore ? (
        <View>
          <Text>Your score is: {score}/{content.content.length}</Text>
          <Button title="Restart Quiz" onPress={restartQuiz} />
        </View>
      ) : (
        <View>
          <Text>{content.content[currentQuestion].question}</Text>
          {content.content[currentQuestion].options.map((option, index) => (
            <Button
              key={index}
              title={option}
              onPress={() => checkAnswer(option === content.content[currentQuestion].correctOption)}
            />
          ))}
        </View>
      )}
    </View>
  );
};

export default Quiz;
