from flask import render_template, request, Blueprint

amily = Blueprint('amily', __name__, static_folder='static', template_folder='template')

@amily.route('/')
def home():
    return render_template('amily/index.html')