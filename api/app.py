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
openai.api_key = "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"

# Compare endpoint: Used to compare the speaker transcription to the current talking point, return whether or not the speaker is on track
class Compare(Resource):
    def post(self):
        talking_point = request.form['talking_point']
        speech = request.form['speech']

        content = f"""
            The following text is a talking point of a speech: "{talking_point}"
            I will now give you an excerpt of the transcription of a speech. Do you think it is likely that this excerpt is part of the given talking point: "{speech}"
            If yes, respond: "True"
            If no, respond with "False"
            Do not include any extra text in your answer. Also, do not include a period at the end of your response.
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

if __name__ == '__main__':
    app.run(debug='true')