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

        # Fetch Wikipedia page 
        summary = self.wikipedia_service.get_summary(data['topic'])
        if summary is None:
            return {'message': 'Page does not exist'}, 404

        prompt = 'Given the following summary, please create three flashcards of the following form: {"flashcards":[{"Question":"Answer"},...]}. Do not respond with anything besides the JSON, and do not get cut off. \n\n' + summary
        gpt_response = self.openai_service.generate_json(prompt)
        print(gpt_response)
        flashcards_json = json.loads(gpt_response.choices[0].text)

        for flashcard in flashcards_json["flashcards"]:
            # Generate the vector for each flashcard
            print(flashcard)
            flashcard_str = f'Question: {flashcard.get("Question")} Answer: {flashcard.get("Answer")}'
            print("Flashcard String", flashcard_str)
            vector = self.hugging_face_service.generate_vector(flashcard_str)
            print("Vector", vector[:5])
            flashcard = self.db_service.save_content(str(flashcard), vector)
            print("flashcard db thing", flashcard)
            self.pinecone_service.upsert(flashcard.id, vector)

        return {'message': 'Flashcards generated successfully'}, 201
