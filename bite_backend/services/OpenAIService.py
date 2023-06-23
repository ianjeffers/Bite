# services/OpenAIService.py
import openai
import os

from dotenv import load_dotenv

class OpenAIService:
    def __init__(self):
        load_dotenv()
        openai.api_key = os.getenv("OPENAI_API_KEY")
        

    def generate_json(self, context, tokens):
        gpt_response = openai.Completion.create(engine="text-davinci-003", prompt=context, max_tokens=tokens)
        return gpt_response
