from db import db

class Content(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    flashcard = db.Column(db.Text)
    vector_string = db.Column(db.Text)

    def __init__(self, flashcard, vector_string):
        self.flashcard = flashcard
        self.vector_string = vector_string
