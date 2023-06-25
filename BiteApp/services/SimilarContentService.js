import ApiService from './ApiService';

class SimilarContentService {
  async fetchContent(topic) {
    try {
      const response = await ApiService.post('/similarity', { context: topic });

      if ([200, 201].includes(response.status)) {
        return response.data.similar_contents.map(contentItem => {
          return {
            type: contentItem.type,
            content: contentItem.content.questions // map content to the questions array
          };
        });
      } else {
        console.error('Unexpected response status')
      }
    } catch (error) {
      console.error('Failed to fetch similar content:', error);
      return;
    }
  }
}

export default new SimilarContentService();
