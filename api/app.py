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
print(os.getenv("OPENAI_API_KEY"))

# Compare endpoint: Used to compare the speaker transcription to the current talking point, return whether or not the speaker is on track
class Compare(Resource):
    prompt = ""

    def post(self):
        input = request.form['text']

        messages = []
        messages.append({"role": "system", "content": self.prompt})

        question = {}
        question['role'] = 'user'
        question['content'] = input
        messages.append(question)
        output = openai.ChatCompletion.create(model="gpt-3.5-turbo",messages=messages)
        return output['choices'][0]['message']['content']


class Listening(Resource):
    print("hi")


# Adding api endpoints
api.add_resource(Compare, '/compare')

if __name__ == '__main__':
    app.run(debug='true')