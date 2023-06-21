from flask_restful import Resource, reqparse
from services.PineconeService import PineconeService

class ContentSimilarity(Resource):
    def __init__(self):
        self.pinecone_service = PineconeService(index_name='content-index')

    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('context', type=str, required=True, help='Education context is required')
        data = parser.parse_args()

        # Get vector representation of the context
        vector = self.pinecone_service.generate_vector(data['context'])

        # Query Pinecone for similar content
        similar_contents = self.pinecone_service.query(vector)

        return {'similar_contents': similar_contents}, 200