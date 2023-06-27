from flask import Flask
from flask_restful import Api
from flask_cors import CORS
from resources import ContentSimilarity, FlashcardGeneration, QuizGeneration, MatchingGeneration, FillInTheBlanksGeneration, TrueOrFalseGeneration, VideoContentGeneration, TopicGeneration
from db import db
from flask import current_app

from services.HuggingFaceService import HuggingFaceService


def create_app():
    app = Flask(__name__)    

    with app.app_context():
        current_app.hugging_face_service = HuggingFaceService()
    # hugging_face_service = HuggingFaceService()

    app.config['SQLALCHEMY_DATABASE_URI'] = "mysql://ianjeffers:password@hostname/database"
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite'
    db.init_app(app)

    cors = CORS(app, resources={r"/*": {"origins": "*"}})
    api = Api(app) 

    api.add_resource(ContentSimilarity, '/similarity')
    api.add_resource(FlashcardGeneration, '/flashcard')
    api.add_resource(QuizGeneration, '/quiz')
    api.add_resource(MatchingGeneration, '/matching')
    api.add_resource(FillInTheBlanksGeneration, '/blanks')
    api.add_resource(TrueOrFalseGeneration, '/trueorfalse')
    api.add_resource(VideoContentGeneration, '/video')
    api.add_resource(TopicGeneration, '/topics')
    @app.route('/test', methods=['POST'])
    def test_endpoint():
        return {"message": "Test endpoint"}

    return app

app = create_app()

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(host='0.0.0.0', debug=False)
