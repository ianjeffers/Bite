import json

from models.Content import Content
from db import db

class DBService:
    def save_content(self, json_string, type):
        try:
            content_string = json.dumps(json_string)
            content = Content(content_string, type)
            db.session.add(content)
            db.session.commit()
            return content
        except Exception as e:
            print(f"Could not save content to database: {e}")
            return None
    def get_content_by_id(self, content_id):
        try:
            content = Content.query.get(content_id)
            return content
        except Exception as e:
            print(f"Could not retrieve content with ID {content_id} from database: {e}")
            return None
