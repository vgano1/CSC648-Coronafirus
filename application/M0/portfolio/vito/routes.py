from flask import render_template, request, Blueprint

vito = Blueprint('vito', __name__, static_folder='static', template_folder='template')

@vito.route('/')
def home():
    return render_template('vito/index.html')