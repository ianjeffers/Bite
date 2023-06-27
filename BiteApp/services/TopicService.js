import axios from 'axios';

class TopicService {
  async generateRelatedTopics(topic, type) {
    try {
        // const response = await axios.post(`http://18.217.80.196:5000/topics`, { topic, reason: type });
        const response = await axios.post(`http://localhost:5000/topics`, { topic, reason: type });

        return response.data.related_topics;
    } catch (error) {
      console.error('Failed to fetch related topics:', error);
      return [];
    }
  }
}

export default new TopicService();
