import ApiService from './ApiService';
import { contentEndpoints } from './ContentService'; 

class NewContentService {
  async fetchContent(contentType, topic) {
    try {
      const endpoint = contentEndpoints[contentType];
      const response = await ApiService.post(endpoint, { topic });
      
      if ([200, 201].includes(response.status)) {
        return response.data.content;
      } else {
        console.error('Unexpected response status');
      }
    } catch (error) {
      console.error('Failed to fetch new content:', error);
      return;
    }
  }
}

export default new NewContentService();
