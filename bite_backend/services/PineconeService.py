import threading
import pinecone
import os

from dotenv import load_dotenv
from services.HuggingFaceService import HuggingFaceService

class PineconeService:
    def __init__(self, index_name):
        if not index_name:
            raise ValueError("Index name is required.")

        load_dotenv()
        pinecone_api_key = os.getenv("PINECONE_API_KEY")
        if not pinecone_api_key:
            raise ValueError("PINECONE_API_KEY not found in environment variables.")
        
        self.index_name = "bite"
        pinecone.init(api_key=pinecone_api_key, environment="us-west1-gcp-free") 
        
        try:
            self.pinecone_client = pinecone.Index(self.index_name)
        except Exception as e:
            raise Exception(f"Error initializing Pinecone index: {str(e)}")
            
        self.hugging_face_service = HuggingFaceService()

        self.lock = threading.Lock()

    def upsert(self, content_id, content):
        return
        if content_id is None or content is None:
            raise ValueError("Both content ID and content must be provided.")
        with self.lock:
            try:
                print("CONTENT ID", str(content_id))
                self.pinecone_client.upsert(vectors=[
                    {"id":str(content_id), "values":content}
                ])
            except Exception as e:
                raise Exception(f"Error executing Pinecone upsert operation: {str(e)}")

    def query(self, query, top_k):
        if query is None or top_k is None:
            raise ValueError("Both query and top_k must be provided.")
        try:
            print(type(query), query[:10])
            results = self.pinecone_client.query(vector=query, top_k=2)
            print(results['matches'])

            # Convert each ScoredVector object to a dictionary
            matches = [{'id': match.id, 'score': match.score} for match in results['matches']]

            return matches
        except Exception as e:
            raise Exception(f"Error executing Pinecone query operation: {str(e)}")
