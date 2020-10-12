from flask import Flask
from flask_restful import Api
from api.config import Config
from api.routes import initialize_routes

def create_api():
    """
    create_api

    Create the flask app with every config needed for the website

    :return: Flask Application
    :rtype: Flask App
    """
    app = Flask(__name__)
    api = Api(app)
    app.config.from_object(Config)
    initialize_routes(api)

    return app