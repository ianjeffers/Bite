from flask_restful import Resource
from models.Content import Content
from sqlalchemy.exc import OperationalError

class ContentList(Resource):
    def get(self):
        try:
            contents = Content.query.all()
            return {'contents': [content.json() for content in contents]}
        except OperationalError:
            return {'message': 'Content table does not exist'}, 404
