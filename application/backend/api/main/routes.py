from flask import render_template, request, Blueprint, jsonify
# from api.main.data import Data
import json

main = Blueprint('main', __name__)

@main.route('/')
@main.route('/home/')
def home():
    """
    home

    Create a Chart and a Data object and return the home page template with Data object

    :return: render the template with data needed for the charts and the data containers
    :rtype: html template
    """

    return jsonify({
        'test': 'test'
        })