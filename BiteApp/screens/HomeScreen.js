import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { homeScreenStyles as styles } from '../styles';
import UserContext from '../contexts/UserContext';

import ContentService from '../services/ContentService';
import FillInTheBlanksScreen from '../screens/FillInTheBlanksScreen';
import FlashcardScreen from '../screens/FlashcardScreen';
import MatchingGameScreen from '../screens/MatchingGameScreen';
import QuizScreen from '../screens/QuizScreen';
import TrueOrFalseScreen from '../screens/TrueOrFalseScreen';
import VideoContentScreen from '../screens/VideoContentScreen';

const HomeScreen = () => {
  const { userContext, setUserContext } = useContext(UserContext);
  const [currentContent, setCurrentContent] = useState(null);
  const [loading, setLoading] = useState(false);

  const screenMap = {
    'blanks': FillInTheBlanksScreen,
    'flashcard': FlashcardScreen,
    'matching': MatchingGameScreen,
    'quiz': QuizScreen,
    'trueorfalse': TrueOrFalseScreen,
    'video': VideoContentScreen,
  };
  let initialTopic = "math"

  useEffect(() => {
    const fetchInitialContent = async () => {
      if (loading) { 
        return;
      }
      setLoading(true); 
      try {
        let contentObject = await ContentService.getContent(userContext, initialTopic);
        console.log("Found content", contentObject)
        setCurrentContent(contentObject);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); 
      }
    };

    fetchInitialContent();
  }, [userContext, loading]);

  const handleLike = async (content) => {
    setUserContext({ type: 'ADD_PREFERRED_TOPIC', payload: content.topic });
  };

  const isEmptyContent = (content) => {
    if (typeof content === 'string') {
      return content === '';
    }
    if (Array.isArray(content)) {
      return content.length === 0;
    }
    if (typeof content === 'object' && content !== null) {
      return Object.keys(content).length === 0;
    }
    return false;
  }

  let ContentComponent = currentContent ? screenMap[currentContent.type] : null;

  if (!ContentComponent || !currentContent || isEmptyContent(currentContent.content)) {
    return (
      <View style={styles.container}>
        <View style={styles.phoneScreen}>
            <ActivityIndicator/>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.phoneScreen}>
        <ContentComponent content={currentContent.content} onLike={handleLike} />
      </View>
    </View>
  );
};

export default HomeScreen;
