from flask import render_template, request, Blueprint

kaimi = Blueprint('kaimi', __name__, static_folder='static', template_folder='template')

@kaimi.route('/')
def home():
    return render_template('kaimi/index.html')