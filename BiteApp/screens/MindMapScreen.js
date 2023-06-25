import React, { useState, useContext } from 'react';
import { View, TextInput, Button, ActivityIndicator, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import UserContext from '../contexts/UserContext';
import TopicService from '../services/TopicService';
import { mindMapStyles as styles } from '../styles';

const initialTopics = ['Art', 'Science', 'Programming', 'Sports', 'Music'];

const MindMapScreen = () => {
  const [topic, setTopic] = useState('');
  const [displayedTopics, setDisplayedTopics] = useState(initialTopics);
  const [selectedTopics, setSelectedTopics] = useState(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const { userContext, setUserContext } = useContext(UserContext);

  const handleEnterTopic = async () => {
    if (topic && !displayedTopics.includes(topic)) {
      setDisplayedTopics([...displayedTopics, topic]);
      setTopic('');
    }
  };

  const handleTopicSelect = async (selectedTopic) => {
    if (!selectedTopics.has(selectedTopic) && selectedTopics.size < 30) {
      setIsLoading(true);
      const newSelectedTopics = new Set(selectedTopics);
      newSelectedTopics.add(selectedTopic);
      setSelectedTopics(newSelectedTopics);
      setUserContext({ type: 'ADD_PREFERRED_TOPIC', payload: Array.from(newSelectedTopics) });
      const relatedTopics = await TopicService.generateRelatedTopics(selectedTopic, 'interest');
      const newTopics = relatedTopics.filter((topic) => !displayedTopics.includes(topic));
      setDisplayedTopics([...displayedTopics, ...newTopics]);
      setIsLoading(false);
    }
  };


  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.bubblesContainer}>
        {displayedTopics.map((displayedTopic, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.bubble,
              selectedTopics.has(displayedTopic) && styles.selectedBubble
            ]}
            onPress={() => handleTopicSelect(displayedTopic)}
          >
            <Text style={[
              styles.bubbleText,
              selectedTopics.has(displayedTopic) && styles.selectedBubbleText
            ]}>
              {displayedTopic}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          value={topic}
          onChangeText={setTopic}
          style={styles.textInput}
          placeholder="Enter a topic"
          onSubmitEditing={handleEnterTopic}
        />
        <Button onPress={handleEnterTopic} title="Add" />
      </View>
      {isLoading && <View style={styles.loadingContainer}><ActivityIndicator size="large" color="#0000ff" /></View>}
    </View>
  );
};

export default MindMapScreen;
