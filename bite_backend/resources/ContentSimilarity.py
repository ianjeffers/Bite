from flask_restful import Resource, reqparse
from services.PineconeService import PineconeService
from services.HuggingFaceService import HuggingFaceService

class ContentSimilarity(Resource):
    def __init__(self):
        self.pinecone_service = PineconeService(index_name='bite')
        self.hugging_face_service = HuggingFaceService()

    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('context', type=str, required=True, help='Education context is required')
        data = parser.parse_args()

        vector = self.hugging_face_service.generate_vector(data['context'])

        similar_contents = self.pinecone_service.query(vector, 2)

        # Only include matches with a score greater than 0.35-- manually tested with best results, should probably review given extra time
        similar_contents = [{'id': match['id'], 'score': match['score']} for match in similar_contents if match['score'] > 0.35]

        print(f"Similar contents: {similar_contents}")

        return {'similar_contents': similar_contents}, 200
