from backend.config import settings
import google.generativeai as genai
import sys

print("API KEY:", repr(settings.GEMINI_API_KEY))
if settings.GEMINI_API_KEY and settings.GEMINI_API_KEY != "your_api_key_here":
    genai.configure(api_key=settings.GEMINI_API_KEY)
    model = genai.GenerativeModel('gemini-2.0-flash')
    try:
        response = model.generate_content("test")
        print("Success:", response.text)
    except Exception as e:
        print("Error:", repr(e))
else:
    print("No API Key.")
