# resources/FlashcardGeneration.py
import json

from flask_restful import Resource, reqparse
from services.DBService import DBService
from services.OpenAIService import OpenAIService
from services.WikipediaService import WikipediaService
from services.PineconeService import PineconeService
from services.HuggingFaceService import HuggingFaceService

class FlashcardGeneration(Resource):
    def __init__(self):
        self.wikipedia_service = WikipediaService()
        self.db_service = DBService()
        self.openai_service = OpenAIService()  
        self.pinecone_service = PineconeService(index_name='bite')  # TODO -> Make multiple indexes (that's $ I think)
        self.hugging_face_service = HuggingFaceService()

    def post(self):
        # Define parser and request args
        parser = reqparse.RequestParser()
        parser.add_argument('topic', type=str, required=True, help='Education topic is required')
        data = parser.parse_args()
        
        #Dummy Data
        return {
            'message': 'Flashcards generated successfully',
            'content': [
                {'Question': 'What is the Pythagorean theorem?', 'Answer': 'In geometry, the Pythagorean theorem states that the square of the hypotenuse is equal to the sum of the squares of the other two sides.'},
                {'Question': 'What is the quadratic formula?', 'Answer': 'The quadratic formula is used in algebra to solve quadratic equations (polynomial equations of the second degree). The general form is ax^2 + bx + c = 0, and the quadratic formula is x = [-b ± sqrt(b^2 - 4ac)] / (2a).'},
                {'Question': 'What is a parallelogram?', 'Answer': 'A parallelogram is a four-sided figure with opposite sides that are both parallel and equal in length.'}
            ]
        }, 201
        
        # Fetch Wikipedia page 
        summary = self.wikipedia_service.get_summary(data['topic'])
        if summary is None:
            return {'message': 'Page does not exist'}, 404

        prompt = 'Given the following summary, please create three flashcards of the following form: {"flashcards":[{"Question":"Answer"},...]}. Do not respond with anything besides the JSON, and do not get cut off. \n\n' + summary
        gpt_response = self.openai_service.generate_json(prompt, 250)
        flashcards_json = json.loads(gpt_response.choices[0].text)

        for flashcard in flashcards_json["flashcards"]:
            # Generate the vector for each flashcard
            flashcard_str = f'Question: {flashcard.get("Question")} Answer: {flashcard.get("Answer")}'
            vector = self.hugging_face_service.generate_vector(flashcard_str)
            flashcard = self.db_service.save_content(str(flashcard), vector)
            self.pinecone_service.upsert(flashcard.id, vector)

        return {'message': 'Flashcards generated successfully', 'content': flashcards_json["flashcards"]}, 201