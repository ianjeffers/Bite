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

        # Get vector representation of the context
        vector = self.hugging_face_service.generate_vector(data['context'])

        # Query Pinecone for similar content
        similar_contents = self.pinecone_service.query(vector, 2)

        return {'similar_contents': similar_contents}, 200