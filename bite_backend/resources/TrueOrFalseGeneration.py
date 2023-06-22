# resources/TrueOrFalseGeneration.py
import json
from flask_restful import Resource, reqparse
from services.DBService import DBService
from services.OpenAIService import OpenAIService
from services.WikipediaService import WikipediaService
from services.PineconeService import PineconeService
from services.HuggingFaceService import HuggingFaceService

class TrueOrFalseGeneration(Resource):
    def __init__(self):
        self.wikipedia_service = WikipediaService()
        self.db_service = DBService()
        self.openai_service = OpenAIService()  
        self.pinecone_service = PineconeService("bite")
        self.hugging_face_service = HuggingFaceService()

    def post(self):
        # Define parser and request args
        parser = reqparse.RequestParser()
        parser.add_argument('topic', type=str, required=True, help='Education topic is required')
        data = parser.parse_args()

        # Fetch Wikipedia page 
        summary = self.wikipedia_service.get_summary(data['topic'])
        if summary is None:
            return {'message': 'Page does not exist'}, 404

        prompt = 'Given the following summary, please create three true or false questions of the following form: {"questions":[{"statement":"...", "is_true": ...},...]}. Do not respond with anything besides the JSON, and do not get cut off. \n\n' + summary
        gpt_response = self.openai_service.generate_json(prompt, 200)
        print(gpt_response)
        questions_json = json.loads(gpt_response.choices[0].text)

        for question in questions_json["questions"]:
            # Generate the vector for each question
            print(question)
            question_str = f'Statement: {question.get("statement")} Is true: {question.get("is_true")}'
            vector = self.hugging_face_service.generate_vector(question_str)
            question = self.db_service.save_content(str(question), vector)
            self.pinecone_service.upsert(question.id, vector)

        return {'message': 'True or False questions generated successfully', 'questions': questions_json["questions"]}, 201
