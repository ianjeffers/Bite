# resources/MatchingGameGeneration.py
import json
from flask_restful import Resource, reqparse
from services.OpenAIService import OpenAIService

class MatchingGeneration(Resource):
    def __init__(self):
        self.openai_service = OpenAIService()  

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

        return {'message': 'Matching pairs generated successfully', 'content': match_pairs_json}, 201

        prompt = 'Given the topic ' + data['topic'] + ', please create three pairs of matching terms. Make sure there is a clear, easy to see connection between them. Here is an example: {"questions":[{ "question": "Coding Competition", "answer": "Ideation" },...]}. Do not respond with anything besides the JSON.'
        gpt_response = self.openai_service.generate_json(prompt, 200)
        match_pairs_json = json.loads(gpt_response.choices[0].text)

        return {'message': 'Matching pairs generated successfully', 'content': match_pairs_json}, 201
