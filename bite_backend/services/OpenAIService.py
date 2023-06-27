import openai
import os

from dotenv import load_dotenv

class OpenAIService:
    def __init__(self):
        load_dotenv()
        try:
            openai.api_key = os.getenv("OPENAI_API_KEY")
        except Exception as e:
            print("Could not set OpenAI API key:", e)

    def generate_json(self, context, tokens):
        try:
            gpt_response = openai.Completion.create(engine="text-davinci-003", prompt=context, max_tokens=tokens)
            print("GPT RESPONSE", gpt_response)
            return gpt_response
        except openai.InvalidRequestError as e:
            print("Invalid request:", e)
            return None
        except openai.RateLimitError as e:
            print("Rate limit exceeded:", e)
            return None
        except Exception as e:
            print("OpenAI request failed:", e)
            return None
