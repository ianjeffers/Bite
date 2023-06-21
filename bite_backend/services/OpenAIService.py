# services/OpenAIService.py
import openai
import os

from dotenv import load_dotenv

class OpenAIService:
    def __init__(self):
        openai.api_key = os.getenv("OPENAI_API_KEY")
        load_dotenv()

    def generate_json(self, context):
        gpt_response = openai.Completion.create(engine="text-davinci-003", prompt=context, max_tokens=250)
        return gpt_response
