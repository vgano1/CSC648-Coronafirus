from flask import render_template, request, Blueprint

thomas = Blueprint('thomas', __name__, static_folder='static', template_folder='template')

@thomas.route('/')
def home():
    return render_template('thomas/index.html')