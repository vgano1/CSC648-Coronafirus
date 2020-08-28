from flask import Flask
from api.config import Config

def create_app():
    """
    create_app

    Create the flask app with every config needed for the website

    :return: Flask Application
    :rtype: Flask App
    """
    app = Flask(__name__)
    app.config.from_object(Config)

    from api.main.routes import main
    app.register_blueprint(main)
    
    return app