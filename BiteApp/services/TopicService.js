import axios from 'axios';

class TopicService {
  async generateRelatedTopics(topic, type) {
    try {
        const response = await axios.post(`http://localhost:5000/topics`, { topic, reason: type });
        return response.data.related_topics;
    } catch (error) {
      console.error('Failed to fetch related topics:', error);
      return []; // Return an empty array in case of error
    }
  }
}

export default new TopicService();
