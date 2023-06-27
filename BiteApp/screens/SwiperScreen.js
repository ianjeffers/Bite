import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import UserContext from '../contexts/UserContext';
import ContentService from '../services/ContentService';
import SwiperComponent from '../components/SwiperComponent';

const SwiperScreen = () => {
  const { userContext, setUserContext } = useContext(UserContext);
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(false);
  
  let topics = ['math', 'english', 'science', 'technology'];
  let initialTopic = userContext.preferences.length > 0 ? 
                      userContext.preferences[Math.floor(Math.random()*userContext.preferences.length)] : 
                      topics[Math.floor(Math.random()*topics.length)];

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
