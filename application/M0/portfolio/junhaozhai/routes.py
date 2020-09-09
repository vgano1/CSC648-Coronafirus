from flask import render_template, request, Blueprint

print(__name__)

junhaozhai = Blueprint('junhaozhai', __name__, static_folder='static', template_folder='template')

@junhaozhai.route('/')
def home():
    return render_template('junhaozhai/index.html')