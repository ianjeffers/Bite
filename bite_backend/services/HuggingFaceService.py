# services/HuggingFaceService.py
from sentence_transformers import SentenceTransformer

class HuggingFaceService:
    def __init__(self):
        # self.model = SentenceTransformer('all-distilroberta-v1')
        self.model = SentenceTransformer('paraphrase-MiniLM-L6-v2')

    def generate_vector(self, text):
        vector = self.model.encode(text)
        return vector.tolist() 
