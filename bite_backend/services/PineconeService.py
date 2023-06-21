# services/PineconeService.py
import pinecone
from services.HuggingFaceService import HuggingFaceService

class PineconeService:
    def __init__(self, index_name):
        # self.index_name = index_name
        self.index_name = "bite"
        pinecone.init(api_key="593cc990-885a-49cc-9d2f-bfb49de1d363", environment="us-west1-gcp-free") 
        self.pinecone_client = pinecone.Index(self.index_name)
        self.hugging_face_service = HuggingFaceService()

    def upsert(self, content_id, content):
        self.pinecone_client.upsert(vectors=[
            {"id":str(content_id), "values":content}
        ])

    def query(self, query, top_k):
        results = self.pinecone_client.query(queries=[query], top_k=top_k)
        return results.ids[0] if results and results.ids else None