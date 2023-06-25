import VideoContentScreen from '../screens/VideoContentScreen';
import TrueOrFalseScreen from '../screens/TrueOrFalseScreen';
import FillInTheBlanksScreen from '../screens/FillInTheBlanksScreen';
import MatchingGameScreen from '../screens/MatchingGameScreen';
import FlashcardScreen from '../screens/FlashcardScreen';
import QuizScreen from '../screens/QuizScreen';
import NewContentService from './NewContentService';
import SimilarContentService from './SimilarContentService';

export const contentEndpoints = {
  video: '/video',
  trueorfalse: '/trueorfalse',
  blanks: '/blanks',
  matching: '/matching',
  flashcard: '/flashcard',
  quiz: '/quiz'
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

  async fetchContent(contentType, topic, similar = true) {
    let fetchedContent = null;
    let fetchedContentType = null;
    similar = false
    if (similar) {
      const response = await SimilarContentService.fetchContent(topic);
      if (response && response.length > 0) {
        fetchedContent = response[0].content;
        fetchedContentType = response[0].type;
      }
    }
    if (!fetchedContent) {
      fetchedContent = await NewContentService.fetchContent(contentType, topic);
      fetchedContentType = contentType; 
    }
    return [fetchedContentType, fetchedContent]; 
  }
  

  async bufferContent(userContext, topic) {
    let type = this.decideContentType(userContext);
    let similar = Math.random() < 0.4;
    const [contentType, fetchedContent]  = await this.fetchContent(type, topic, similar);
    console.log('Fetched content:', fetchedContent); 
    console.log("Fetched Content Type", contentType)
  
    if (fetchedContent) {
      this.contentQueue.push({
        content:fetchedContent,
        type:contentType
      });
    }
  }

  async getContent(userContext, topic) {
    if (this.contentQueue.length <= 2) {
      await this.bufferContent(userContext, topic);
      await new Promise(resolve => setTimeout(resolve, 3000));
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
