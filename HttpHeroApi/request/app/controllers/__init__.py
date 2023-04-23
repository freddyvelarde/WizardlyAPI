from flask import Blueprint, make_response, jsonify, request
from helpers.fetch_api import get_request

requester_bp = Blueprint("requester", __name__)


@requester_bp.route("/hello", methods=["GET"])
def hello():
    return jsonify({"message": "Hello, World xd!"})


@requester_bp.route("/", methods=["POST"])
def index():
    try:
        body = request.json
        response = get_request(body["url"])
        return jsonify(response.json())
    except Exception as e:
        return make_response(jsonify({"message": "error requesting", "error": e}), 500)
