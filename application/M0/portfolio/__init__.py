from flask import Flask
from portfolio.config import Config
from portfolio.souhib.routes import souhib
from portfolio.amily.routes import amily
from portfolio.junhaozhai.routes import junhaozhai
from portfolio.kaimi.routes import kaimi
from portfolio.thomas.routes import thomas
from portfolio.vito.routes import vito

def create_app():
    """
    create_app

    Create the flask app with every config needed for the website

    :return: Flask Application
    :rtype: Flask App
    """
    app = Flask(__name__, template_folder='.')
    app.config.from_object(Config)

    app.register_blueprint(kaimi, url_prefix='/kaimi',)
    app.register_blueprint(amily, url_prefix='/amily')
    app.register_blueprint(souhib, url_prefix='/souhib')
    app.register_blueprint(junhaozhai, url_prefix='/junhaozhai')
    app.register_blueprint(thomas, url_prefix='/thomas')
    app.register_blueprint(vito, url_prefix='/vito')

    return app
