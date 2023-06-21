# services/DBService.py
import json

from models.Content import Content
from db import db

class DBService:
    def save_content(self, flashcard, vector):
        vector_string = json.dumps(vector)
        content = Content(flashcard, vector_string)
        db.session.add(content)
        db.session.commit()
        return content
