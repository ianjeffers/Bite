# resources/ContentGeneration.py
from flask_restful import Resource, reqparse
from models.Content import Content
from db import db
from services.DBService import DBService
from services.OpenAIService import OpenAIService
from services.PineconeService import PineconeService

class ContentGeneration(Resource):
    def __init__(self):
        self.openai_service = OpenAIService()
        self.db_service = DBService()
        self.pinecone_service = PineconeService(index_name='content-index') 

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('context', type=str, required=True, help='Education context is required')
        data = parser.parse_args()

        # Generate content using OpenAI service
        gpt_response = self.openai_service.generate_content(data['context'])

        # Store content in SQLite database and generate vector
        content, vector = self.db_service.save_content(gpt_response.choices[0].text)

        # Store content and vector in Pinecone
        self.pinecone_service.upsert(content.id, vector)

        return {'message': 'Content generated successfully'}, 201