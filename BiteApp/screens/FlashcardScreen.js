// screens/FlashcardScreen.js
import React, { useState, useEffect } from 'react';
import Swiper from 'react-native-swiper/src';
import { View, ActivityIndicator } from 'react-native';
import axios from 'axios';
import Flashcard from '../components/Flashcard';
import { flashcardScreenStyles as styles } from '../styles';

const FlashcardScreen = () => {
  // const [flashcards, setFlashcards] = useState(null);


  // useEffect(() => {
  //   const fetchFlashcards = async () => {
  //     try {
  //       const response = await axios.post('http://localhost:5000/flashcard', {
  //         topic: 'Hackathon' // TODO -> Generate from user context/feed
  //       });
  //       setFlashcards(response.data.flashcards);
  //     } catch (error) {
  //       console.error('Failed to fetch flashcards:', error);
  //     }
  //   };

  //   fetchFlashcards();
  // }, []);

  // if (!flashcards) {
  //   return <ActivityIndicator size="large" color="#0000ff" />;
  // }

  const flashcards = [
    { question: 'Who was Albert Einstein?', answer: 'A theoretical physicist who developed the theory of relativity.' },
    { question: 'What is E=mc^2?', answer: 'Einstein\'s mass-energy equivalence formula.' },
  ];

  return (
    <View style={styles.wrapper}>
      <Swiper showsPagination={true} loop={false} showsButtons={false}>
        {flashcards.map((card, index) => (
          <Flashcard key={index} question={card.question} answer={card.answer} />
        ))}
      </Swiper>
    </View>
  );
};

export default FlashcardScreen;
