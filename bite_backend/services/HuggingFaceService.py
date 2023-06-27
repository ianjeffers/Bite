from sentence_transformers import SentenceTransformer

class HuggingFaceService:
    _instance = None

    def __new__(cls, *args, **kwargs):
        if cls._instance is None:
            print("Creating HuggingFaceService instance")
            cls._instance = super(HuggingFaceService, cls).__new__(cls)
        return cls._instance

    def __init__(self):
        try:
            print("INIT MODEL")
            self.model = SentenceTransformer('sentence-transformers/all-mpnet-base-v2')
        except Exception as e:
            print(f"Could not load the SentenceTransformer model: {e}")
            self.model = None

    def generate_vector(self, text):
        print("GENERATING VECTOR")
        if self.model is None:
            return None
        try:
            vector = self.model.encode(text)
            return vector.tolist() 
        except Exception as e:
            print(f"Could not generate vector for text: {e}")
            return None
