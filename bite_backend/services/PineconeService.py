import threading
import pinecone
import os

from flask import current_app
from dotenv import load_dotenv
from services.HuggingFaceService import HuggingFaceService

class PineconeService:
    def __init__(self, index_name):
        print("Chad Croger")
        if not index_name:
            raise ValueError("Index name is required.")

        load_dotenv()
        pinecone_api_key = os.getenv("PINECONE_API_KEY")
        if not pinecone_api_key:
            raise ValueError("PINECONE_API_KEY not found in environment variables.")
        
        print("API keyed up")
        self.index_name = "bite"
        pinecone.init(api_key=pinecone_api_key, environment="us-west1-gcp-free") 
        print("innit")
        try:
            self.pinecone_client = pinecone.Index(self.index_name)
            print("index")
        except Exception as e:
            raise Exception(f"Error initializing Pinecone index: {str(e)}")
            
        self.hugging_face_service = current_app.hugging_face_service


        self.lock = threading.Lock()

    def upsert(self, content_id, content):
        print("upserting")
        if content_id is None or content is None:
            raise ValueError("Both content ID and content must be provided.")
        with self.lock:
            try:
                self.pinecone_client.upsert(vectors=[
                    {"id":str(content_id), "values":content}
                ])
            except Exception as e:
                raise Exception(f"Error executing Pinecone upsert operation: {str(e)}")
        print('upserted')

    def query(self, query, top_k):
        print("Querying")
        if query is None or top_k is None:
            raise ValueError("Both query and top_k must be provided.")
        try:
            results = self.pinecone_client.query(vector=query, top_k=2)
           
            return results['matches']
        except Exception as e:
            raise Exception(f"Error executing Pinecone query operation: {str(e)}")
        print("Queried")
