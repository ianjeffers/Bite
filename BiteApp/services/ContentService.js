import axios from 'axios';
import VideoContentScreen from '../screens/VideoContentScreen';
import TrueOrFalseScreen from '../screens/TrueOrFalseScreen';
import FillInTheBlanksScreen from '../screens/FillInTheBlanksScreen';
import MatchingGameScreen from '../screens/MatchingGameScreen';
import FlashcardScreen from '../screens/FlashcardScreen';
import QuizScreen from '../screens/QuizScreen';
import ApiService from './ApiService';

const contentEndpoints = {
  video: '/video',
  trueorfalse: '/trueorfalse',
  blanks: '/blanks',
  matching: '/matching',
  flashcard: '/flashcard',
  quiz: '/quiz'
};

const contentScreenComponents = {
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
      console.log("FOUND RESPONSE", response)
      if ([200, 201].includes(response.status)) {
        console.log("RETURNING", response.data.content, "WITH TYPE", contentType)
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
    const allContentTypes = Object.keys(contentEndpoints);
    const contentType = allContentTypes[this.contentTypeIndex];
    console.log('Fetching content type:', contentType); 
    const fetchedContent = await this.fetchContent(contentType, topic);
    console.log('Fetched content:', fetchedContent); 
  
    if (fetchedContent) {
      this.contentQueue.push({
        content:fetchedContent,
        type:contentType
      });
    };
    
    this.contentTypeIndex = (this.contentTypeIndex + 1) % allContentTypes.length;
  }
  

  // async fetchNextContent() {
  //   this.fetching = true;

  //   while (this.fetchQueue.length > 0) {
  //     const { contentType, topic } = this.fetchQueue.shift();

  //     const fetchedContent = await this.fetchContent(contentType, topic);

  //     if (fetchedContent.length) {
  //       this.contentQueue.push(...fetchedContent);
  //     }
  //   }

  //   this.fetching = false;
  // }

  async getContent(userContext, topic) {
    console.log('Content Queue Length:', this.contentQueue.length); 
    if (this.contentQueue.length === 0) {
      await this.bufferContent(userContext, topic);
    }
  
    if (this.contentQueue.length > 0) {
      const content = this.contentQueue.shift();
      console.log('Returning content:', content); 
      return content;
    } else {
      // No content available yet
      console.log('No content available yet'); 
      return;
    }
  }
}

export default new ContentService();
