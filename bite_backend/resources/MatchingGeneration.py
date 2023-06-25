# resources/MatchingGameGeneration.py
import json
from flask_restful import Resource, reqparse
from services.OpenAIService import OpenAIService
from services.DBService import DBService
from services.PineconeService import PineconeService
from services.HuggingFaceService import HuggingFaceService

class MatchingGeneration(Resource):
    def __init__(self):
        self.openai_service = OpenAIService()
        self.db_service = DBService()
        self.pinecone_service = PineconeService(index_name='bite')
        self.hugging_face_service = HuggingFaceService()


    def post(self):
        # Define parser and request args
        parser = reqparse.RequestParser()
        parser.add_argument('topic', type=str, required=True, help='Education topic is required')
        data = parser.parse_args()
        
        # Replace generator with dummy data
        match_pairs_json = {
            'Questions': [
                { 'Question': "Addition & Subtraction", 'Answer': "Arithmetic" },
                { 'Question': "Factoring & Graphing", 'Answer': "Algebra" },
                { 'Question': "Pythagorean Theorem", 'Answer': "Geometry" }
            ]
        }

        # return {'message': 'Matching pairs generated successfully', 'content': match_pairs_json}, 201

        # prompt = 'Given the topic ' + data['topic'] + ', please create three pairs of matching terms. Make sure there is a clear, easy to see connection between them. Here is an example: {"questions":[{ "question": "Coding Competition", "answer": "Ideation" },...]}. Do not respond with anything besides the JSON.'
        # gpt_response = self.openai_service.generate_json(prompt, 200)
        # match_pairs_json = json.loads(gpt_response.choices[0].text)

        try:
            content_string = ' '.join([q['Question'] + ' ' + q['Answer'] for q in match_pairs_json['Questions']])
            vector = self.hugging_face_service.generate_vector(content_string)
            matching = self.db_service.save_content(str(match_pairs_json), vector)
            self.pinecone_service.upsert(matching.id, vector)
        except Exception as e:
            return {'message': 'Error in generating Matching content', 'error': str(e)}, 500

        return {'message': 'Matching pairs generated successfully', 'content': match_pairs_json}, 201
