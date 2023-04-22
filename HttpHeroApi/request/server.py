from flask import Flask, jsonify, request, make_response


import requests

app = Flask(__name__)


@app.route("/hello", methods=["GET"])
def hello():
    return jsonify({"message": "Hello, World!"})


@app.route("/", methods=["POST"])
def index():
    try:
        body = request.json
        response = requests.get(body["url"])
        return jsonify(response.json())
    except Exception as e:
        return make_response(jsonify({"message": "error requesting", "error": e}), 200)


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
