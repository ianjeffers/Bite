// screens/MatchingGameScreen.js
import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import axios from 'axios';
import MatchingGame from '../components/MatchingGame';

const MatchingGameScreen = () => {
  const [matchPairs, setMatchPairs] = useState(null);

  useEffect(() => {
    const fetchMatchPairs = async () => {
      try {
        const response = await axios.post('http://localhost:5000/matching', {
          topic: 'Minecraft' // TODO -> Generate from user context/feed
        });
        setMatchPairs(response.data.match_pairs["questions"]);
        console.log(response.data.match_pairs);
      } catch (error) {
        console.error('Failed to fetch match pairs:', error);
      }
    };

    fetchMatchPairs();
  }, []);

  if (!matchPairs) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View>
      {matchPairs && <MatchingGame matchPairs={matchPairs} />}
    </View>
  );
};

export default MatchingGameScreen;
