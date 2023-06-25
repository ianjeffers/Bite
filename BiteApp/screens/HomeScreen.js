import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { homeScreenStyles as styles } from '../styles';
import UserContext from '../contexts/UserContext';

import ContentService from '../services/ContentService';
import SwiperComponent from '../components/SwiperComponent';

const HomeScreen = () => {
  const { userContext, setUserContext } = useContext(UserContext);
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(false);

  let initialTopic = "math"

  const fetchContents = async () => {
    if (loading) { 
      return;
    }
    try {
      setLoading(true);
      let contentObject = await ContentService.getContent(userContext, initialTopic);
      setContents(prevContents => [...prevContents, contentObject]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchContents();
    const intervalId = setInterval(fetchContents, 10000); 

    return () => clearInterval(intervalId);
  }, []);

  const handleLike = async (content) => {
    setUserContext({ type: 'ADD_PREFERRED_TOPIC', payload: content.topic });
  };

  if (contents.length === 0) {
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
        <SwiperComponent 
          contents={contents} 
          onLike={handleLike} 
        />
      </View>
    </View>
  );
}

export default HomeScreen;
