from flask import Flask, jsonify, request
from flask_restful import Resource, Api
import openai
import os
from flask_cors import CORS


# Create flask app
app = Flask(__name__)
CORS(app)
# Create flask api object
api = Api(app)

# Set OpenAI API Key 
openai.api_key = os.getenv("OPENAI_API_KEY")

# Compare endpoint: Used to compare the speaker transcription to the current talking point, return whether or not the speaker is on track
class Compare(Resource):
    prompt = """
    I will give you two different excerpts, your job is to determine whether the two prompts are related.
    Be lenient - if the excerpts are roughly about the same topic consider them related.
    I will provide the two excerpts in this format: ["excerpt1", "excerpt2"].
    If you determine that the excerpts are related, return "True".
    Otherwise, return "False".
    Do not include any addition text of punctuation.
    """


    def post(self):
        talking_point = request.form['talking_point']
        speech = request.form['speech']

        input = "[\"" + talking_point + "\", \"" + speech + "\"]"
        print(input)

        messages = [
            {
                "role": "system",
                "content": self.prompt
            },
            {
                "role": "user",
                "content": input
            }
        ]

        output = openai.ChatCompletion.create(model="gpt-3.5-turbo",messages=messages)['choices'][0]['message']['content']
        return output


class Review(Resource):
    def post(self):
        transcript = request.form['transcript']
        content = f"""
            Here is the transcript of a speech I just gave: '{transcript}'. Please provide feedback on my speech and presentation, highlighting any areas where I can improve according to general principles of public speaking and presenting.
        """
        messages = [
            {
                "role": "user",
                "content": content
            }
        ]
        output = openai.ChatCompletion.create(model="gpt-3.5-turbo",messages=messages)['choices'][0]['message']['content']
        return output


# Adding api endpoints
api.add_resource(Compare, '/compare')
api.add_resource(Review, '/review')



if __name__ == '__main__':
    app.run(debug='true')