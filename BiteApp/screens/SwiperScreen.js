// screens/SwiperScreen.js

import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { homeScreenStyles as styles } from '../styles';
import UserContext from '../contexts/UserContext';
import ContentService from '../services/ContentService';
import SwiperComponent from '../components/SwiperComponent';

const SwiperScreen = () => {
  const { userContext, setUserContext } = useContext(UserContext);
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(false);

  let initialTopic = "math";

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


  if (contents.length === 0) {
    return (
        <ActivityIndicator/>
    );
  }

  return (
    <SwiperComponent contents={contents} />
  );
}

export default SwiperScreen;
