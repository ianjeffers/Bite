import axios from 'axios';
import UserContext from '../contexts/UserContext';

const contentEndpoints = {
  video: '/video',
  trueorfalse: '/trueorfalse',
  blanks: '/blanks',
  matching: '/matching',
  flashcard: '/flashcard',
  quiz: '/quiz'
};

class ContentService {
  static contextType = UserContext;

  constructor() {
    this.contentQueue = [];
  }

  decideContentType() {
    const { userPreference, userSkillLevel } = this.context;
    
    const allContentTypes = Object.keys(contentEndpoints);

    const usePreferredType = Math.random() < 0.7;

    let selectedContentType;
    if (usePreferredType) {
      selectedContentType = userPreference[Math.floor(Math.random() * userPreference.length)];
    } else {
      selectedContentType = allContentTypes[Math.floor(Math.random() * allContentTypes.length)];
    }

    return contentEndpoints[selectedContentType];
  }

  async bufferContent(topic) {
    try {
      const contentType = this.decideContentType();
      const response = await axios.post(`http://localhost:5000${contentType}`, { topic });
      this.contentQueue.push(...response.data.flashcards);
    } catch (error) {
      console.error('Failed to fetch content:', error);
    }
  }

  async getContent(topic) {
    if (this.contentQueue.length < 5) {
      await this.bufferContent(topic);
    }

    return this.contentQueue.shift();
  }
}

export default new ContentService();
