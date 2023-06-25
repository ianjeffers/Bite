import axios from 'axios';
import VideoContentScreen from '../screens/VideoContentScreen';
import TrueOrFalseScreen from '../screens/TrueOrFalseScreen';
import FillInTheBlanksScreen from '../screens/FillInTheBlanksScreen';
import MatchingGameScreen from '../screens/MatchingGameScreen';
import FlashcardScreen from '../screens/FlashcardScreen';
import QuizScreen from '../screens/QuizScreen';
import ApiService from './ApiService';

const contentEndpoints = {
  // video: '/video',
  // trueorfalse: '/trueorfalse',
  blanks: '/blanks',
  // matching: '/matching',
  // flashcard: '/flashcard',
  // quiz: '/quiz'
};

export const contentScreenComponents = {
  video: VideoContentScreen,
  trueorfalse: TrueOrFalseScreen,
  blanks: FillInTheBlanksScreen,
  matching: MatchingGameScreen,
  flashcard: FlashcardScreen,
  quiz: QuizScreen
};

class ContentService {
  constructor() {
    this.contentQueue = [];
    this.maxRetries = 0;
    this.fetchQueue = [];
    this.fetching = false;
    this.contentTypeIndex  = 0;
  }

  decideContentType(userContext) {
    const { userPreference } = userContext || {};
    const allContentTypes = Object.keys(contentEndpoints);

    if (userPreference) {
      const usePreferredType = Math.random() < 0.7;

      if (usePreferredType) {
        return allContentTypes[Math.floor(Math.random() * allContentTypes.length)];
      }
    }

    return allContentTypes[Math.floor(Math.random() * allContentTypes.length)];
  }

  async fetchContent(contentType, topic) {
    try {
      const response = await ApiService.post( 
        `${contentEndpoints[contentType]}`,
        { topic }
      );
      if ([200, 201].includes(response.status)) {
        return response.data.content
      } else {
        console.error('Unexpected response status')
      }
    } catch (error) {
      console.error('Failed to fetch content:', error);
      return;
    }
  }

  async bufferContent(userContext, topic) {
    const contentType = this.decideContentType(userContext);
    const fetchedContent = await this.fetchContent(contentType, topic);
    console.log('Fetched content:', fetchedContent); 
  
    if (fetchedContent) {
      this.contentQueue.push({
        content:fetchedContent,
        type:contentType
      });
    };
  }

  

  async getContent(userContext, topic) {
    if (this.contentQueue.length <= 2) {
      await this.bufferContent(userContext, topic);
    }
  
    if (this.contentQueue.length > 0) {
      const content = this.contentQueue.shift();  
      return content;
    } else {
      console.log('No content available yet');
      return null;
    }
  }

  removeContent(count) {
    this.contentQueue.splice(0, count);
  }
  
}

export default new ContentService();
