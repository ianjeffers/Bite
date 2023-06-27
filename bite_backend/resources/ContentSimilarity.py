from flask_restful import Resource, reqparse
from services.PineconeService import PineconeService
from services.HuggingFaceService import HuggingFaceService
from services.DBService import DBService
from flask import current_app
import json


class ContentSimilarity(Resource):
    def __init__(self):
        self.pinecone_service = PineconeService(index_name='bite')
        self.hugging_face_service = current_app.hugging_face_service
        self.db_service = DBService()

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('context', type=str, required=True, help='Education context is required')
        data = parser.parse_args()

        vector = self.hugging_face_service.generate_vector(data['context'])

        similar_contents = self.pinecone_service.query(vector, 2)

        similar_contents = [{'id': match['id'], 'score': match['score']} for match in similar_contents if match['score'] > 0.35]
        similar_content_objects = []
        for content in similar_contents:
            db_content = self.db_service.get_content_by_id(content['id'])
            if db_content:
                content_obj = json.loads(db_content.content)
                similar_content_objects.append({
                    'id': content['id'],
                    'content': content_obj,
                    'type': db_content.type,
                })
        return {'similar_contents': similar_content_objects}, 200
