import React from 'react';
import Swiper from 'react-native-swiper/src';
import { View, ActivityIndicator } from 'react-native';
import Flashcard from '../components/Flashcard';
import LikeButton from '../components/LikeButton';
import { FlashcardScreenStyles as styles } from '../styles';

const FlashcardScreen = ({ content: { content: flashcards }, onLike, isContentLiked, validContents, index: currentIndex }) => {
  if (!flashcards) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
        <View style={{ position: 'relative', flex: 1 }}>
          <LikeButton onLike={() => onLike(validContents[currentIndex])} isLiked={isContentLiked(validContents[currentIndex])} />
          <View style={styles.wrapper}>
            <Swiper showsPagination={false} loop={false} showsButtons={false}>
              {flashcards.map((card, index) => (
                <Flashcard key={index} question={card.Question} answer={card.Answer} />
              ))}
            </Swiper>
          </View>
        </View>
  );
};

export default FlashcardScreen;
