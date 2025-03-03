import requests
import json

def ats_extractor(resume_data):
    # Gemini API endpoint and API key
    GEMINI_API_KEY = "AIzaSyChInQB6FswlCsrMsUr_kz6ZfJoMpODasQ"
    GEMINI_URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key={GEMINI_API_KEY}"
    
    # Define the prompt
    prompt = f"""
        I am building an AI-based interview facilitator application. I need you to generate a set of technical interview questions and their short answers strictly tailored to a candidate's field of interest and technical skills.If candidate not upload resume like candidate upload pdf which is not resume than show error"This is not Resume"
    Generate 30 Questions , where 5 questions is easy level 15 in intermediate level and 10 is hard level
    Provide the output in JSON format only.
    Also display Candidate Name, Email,Linkedin profile,Github profile,thier intrested  job feild and their techinical skills 

    Resume Data: {resume_data}
    """

    # Define the request payload
    payload = {
        "contents": [
            {
                "parts": [
                    {
                        "text": prompt
                    }
                ]
            }
        ]
    }

    # Define headers
    headers = {
        "Content-Type": "application/json"
    }

    # Make the POST request to the Gemini API
    response = requests.post(GEMINI_URL, headers=headers, json=payload)

    # Handle the response
    if response.status_code == 200:
        try:
            response_data = response.json()
            # Extract the generated text
            generated_content = response_data["candidates"][0]["content"]["parts"][0]["text"]
            
         
            print("generatedcontent",generated_content)
            # Parse the cleaned content as JSON
            return generated_content
        except json.JSONDecodeError:
            raise ValueError(f"Failed to parse the response as JSON: {generated_content}")
    else:
        raise RuntimeError(f"Gemini API Error: {response.status_code}, {response.text}")