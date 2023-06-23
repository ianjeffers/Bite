# resources/FillInTheBlanksGeneration.py
import json

from flask_restful import Resource, reqparse
from services.DBService import DBService
from services.OpenAIService import OpenAIService
from services.WikipediaService import WikipediaService
from services.HuggingFaceService import HuggingFaceService
from services.PineconeService import PineconeService

class FillInTheBlanksGeneration(Resource):
    def __init__(self):
        self.wikipedia_service = WikipediaService()
        self.db_service = DBService()
        self.openai_service = OpenAIService() 
        self.hugging_face_service = HuggingFaceService()
        self.pinecone_service = PineconeService("bite")

    def post(self):
        # Define parser and request args
        parser = reqparse.RequestParser()
        parser.add_argument('topic', type=str, required=True, help='Education topic is required')
        data = parser.parse_args()

        #Dummy Data
        return {
        'message': 'Fill in the blanks game generated successfully', 
        'content': {
            'sentence': 'The Pythagorean Theorem is a fundamental relation in _____ which states that in a right-angled triangle, the square of the length of the hypotenuse (the side opposite the right angle) is equal to the sum of the squares of the lengths of the other two sides.',
            'answer': 'geometry',
            'wordBank': ['geometry', 'algebra', 'calculus', 'trigonometry']
        }
    }, 201

        # Fetch Wikipedia page 
        summary = self.wikipedia_service.get_summary(data['topic'])
        if summary is None:
            return {'message': 'Page does not exist'}, 404

        prompt = 'Given the following summary, please create a sentence with a missing word or phrase in the form of a fill-in-the-blanks game. Also provide a word bank that contains the correct answer (missing word previously selected) and a few decoys. Format: {"sentence": "_____", "answer": "_____", "wordBank": ["_____", "_____", "_____"]}. Only respond with the JSON content. ' + summary
        gpt_response = self.openai_service.generate_json(prompt, 250)
        fill_in_the_blanks = json.loads(gpt_response.choices[0].text.strip())
        # Generate the vector for each sentence
        fill_in_the_blanks_str = str(fill_in_the_blanks)
        vector = self.hugging_face_service.generate_vector(fill_in_the_blanks_str)
        content = self.db_service.save_content(fill_in_the_blanks_str, vector)
        self.pinecone_service.upsert(content.id, vector)

        # fill_in_the_blanks = {key: getattr(content, key) for key in ['id', 'content', 'vector']}
        
        return {'message': 'Fill in the blanks game generated successfully', 'content': fill_in_the_blanks}, 201
