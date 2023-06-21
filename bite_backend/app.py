# app.py
from flask import Flask
from flask_restful import Api
from flask_cors import CORS
from resources import ContentList, ContentGeneration, ContentQuery, ContentSimilarity, FlashcardGeneration
from models import Content
from db import db
import os
def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite'
    db.init_app(app)

    CORS(app) 
    api = Api(app)  # create an API

    print("Database path:", os.path.abspath("db.sqlite"))

    # add resources to the API
    api.add_resource(ContentList, '/contents')
    api.add_resource(ContentGeneration, '/generate')
    api.add_resource(ContentQuery, '/query')
    api.add_resource(ContentSimilarity, '/similarity')
    api.add_resource(FlashcardGeneration, '/flashcard')

    return app

app = create_app()

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
