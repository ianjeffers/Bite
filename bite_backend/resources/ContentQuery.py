from services.HuggingFaceService import HuggingFaceService
from flask_restful import Resource, reqparse
from services.PineconeService import PineconeService
from models.Content import Content
from db import db

class ContentQuery(Resource):
    def __init__(self):
        self.pinecone_service = PineconeService(index_name='bite')
        self.hugging_face_service = HuggingFaceService()

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('query', type=str, required=True, help='Content query is required')
        data = parser.parse_args()

        # Convert the text query into a vector
        print(data['query'], type(data['query']))
        query_vector = self.hugging_face_service.generate_vector(data['query'])
        print(query_vector[:5])
        similar_content_ids = self.pinecone_service.query(query_vector, top_k=5)

        if similar_content_ids is None:
            return {'message': 'No similar content found'}, 404

        similar_contents = Content.query.filter(Content.id.in_(similar_content_ids)).all()

        return {'contents': [content.json() for content in similar_contents]}, 200