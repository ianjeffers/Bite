import threading
import pinecone
import os

from dotenv import load_dotenv
from services.HuggingFaceService import HuggingFaceService

class PineconeService:
    def __init__(self, index_name):
        # self.index_name = index_name

        load_dotenv()
        pinecone_api_key = os.getenv("PINECONE_API_KEY")
        self.index_name = "bite"
        pinecone.init(api_key=pinecone_api_key, environment="us-west1-gcp-free") 
        self.pinecone_client = pinecone.Index(self.index_name)
        self.hugging_face_service = HuggingFaceService()

        # Initialize a lock
        self.lock = threading.Lock()

    def upsert(self, content_id, content):
        # Acquire the lock before executing upsert
        with self.lock:
            self.pinecone_client.upsert(vectors=[
                {"id":str(content_id), "values":content}
            ])

    def query(self, query, top_k):
        results = self.pinecone_client.query(queries=[query], top_k=top_k)
        return results.ids[0] if results and results.ids else None
