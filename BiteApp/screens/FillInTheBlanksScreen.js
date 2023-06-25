import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { FillInTheBlanksScreenStyles as styles } from '../styles';
import { CommonStyles as commonStyles } from '../styles';
import { Button } from 'react-native-elements';
import LikeButton from '../components/LikeButton';

const FillInTheBlanksScreen = ({ content, onLike, isContentLiked, validContents, index: currentIndex }) => {
  const [userAnswer, setUserAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  content = content.content

  const handleAnswer = (answer) => {
    setUserAnswer(answer);
  };

  const handleSubmit = () => {
    if (userAnswer === content.answer) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  if (!content) {
    return <Text>No game data available.</Text>;
  }

  return (
    <View style={[commonStyles.container, {flexDirection: 'column', justifyContent: 'space-between', paddingBottom:'10%'}]}>
      <View>
        <LikeButton onLike={() => onLike(validContents[currentIndex])} isLiked={isContentLiked(validContents[currentIndex])} />
        <View style={styles.contentContainer}>
          <Text style={styles.sentence}>{content.sentence.replace('_____', '________')}</Text>
          <View style={styles.wordBank}>
            {content.wordBank.map((word, index) => (
            <Button
              key={index}
              title={word}
              onPress={() => {
                if (!isCorrect) {
                  handleAnswer(word);
                }
              }}
              buttonStyle={{
                backgroundColor: userAnswer === word ? '#7c7bad' : '#f0f0f0',
                margin: 5,
              }}
              titleStyle={{
                color: userAnswer === word ? '#f0f0f0' : '#000000',
              }}
              disabled={isCorrect}
            />
          ))}
        </View>
          {isCorrect !== null && (
            <Text style={isCorrect ? styles.correct : styles.incorrect}>
              {isCorrect ? 'Correct!' : 'Incorrect, please try again.'}
            </Text>
          )}
        </View>
      </View>
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default FillInTheBlanksScreen;
