from flask import Flask
from .controllers import requester_bp

app = Flask(__name__)

app.register_blueprint(requester_bp)
