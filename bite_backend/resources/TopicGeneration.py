# resources/TopicGeneration.py
from flask_restful import Resource, reqparse
from services.TopicService import TopicService

class TopicGeneration(Resource):
    def __init__(self):
        self.topic_service = TopicService()

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('topic', type=str, required=True, help='Topic is required')
        parser.add_argument('reason', type=str, required=True, choices=('mastered', 'interest', 'random'), help='Reason for topic generation is required')
        data = parser.parse_args()

        related_topics = self.topic_service.generate_related_topics(data['topic'], data['reason'])
        print(related_topics)
        return {'related_topics': related_topics}, 200
