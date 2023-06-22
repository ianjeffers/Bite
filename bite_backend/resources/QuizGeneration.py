# resources/QuizGeneration.py
import json

from flask_restful import Resource, reqparse
from services.DBService import DBService
from services.OpenAIService import OpenAIService
from services.WikipediaService import WikipediaService

class QuizGeneration(Resource):
    def __init__(self):
        self.wikipedia_service = WikipediaService()
        self.db_service = DBService()
        self.openai_service = OpenAIService()  

    def post(self):
        # Define parser and request args
        parser = reqparse.RequestParser()
        parser.add_argument('topic', type=str, required=True, help='Education topic is required')
        data = parser.parse_args()

        # Fetch Wikipedia page 
        page = self.wikipedia_service.get_page(data['topic'])
        if page is None:
            return {'message': 'Page does not exist'}, 404
        page = page.summary + page.content[:1000]

        prompt = 'Given the following summary, please create a three question multiple-choice quiz of the following form: {"quiz":[{"question":"...", "options":[...], "correctOption":"..."},...]}. Please make sure the correct answer is identical to the option provided\n\n' + page
        gpt_response = self.openai_service.generate_json(prompt, 550)
        quiz_json = json.loads(gpt_response.choices[0].text)

        # TODO: Add code here to store quiz in database if necessary


        return {'message': 'Quiz generated successfully', 'quiz': quiz_json["quiz"]}, 201
