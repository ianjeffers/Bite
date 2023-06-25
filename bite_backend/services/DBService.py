import json

from models.Content import Content
from db import db

class DBService:
    def save_content(self, json_string, vector_string=None):
        mock_content = Content(json_string, vector_string)
        mock_content.id = 1 
        return mock_content
        try:
            vector_string = json.dumps(vector)
            content = Content(json_string, vector_string)
            db.session.add(content)
            db.session.commit()
            return content
        except Exception as e:
            print(f"Could not save content to database: {e}")
            return None
