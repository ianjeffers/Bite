from db import db

class Content(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text)
    type = db.Column(db.Text)

    def __init__(self, content, type):
        self.content = content
        self.type = type
