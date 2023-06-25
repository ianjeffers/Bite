from sentence_transformers import SentenceTransformer

class HuggingFaceService:
    def __init__(self):
        try:
            # self.model = SentenceTransformer('all-distilroberta-v1')
            self.model = SentenceTransformer('sentence-transformers/all-mpnet-base-v2')
        except Exception as e:
            print(f"Could not load the SentenceTransformer model: {e}")
            self.model = None

    def generate_vector(self, text):
        if self.model is None:
            return None
        try:
            vector = self.model.encode(text)
            return vector.tolist() 
        except Exception as e:
            print(f"Could not generate vector for text: {e}")
            return None
