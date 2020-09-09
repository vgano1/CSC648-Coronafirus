from flask import render_template, request, Blueprint
print(__name__)

souhib = Blueprint('souhib', __name__, static_folder='static', template_folder='template')

@souhib.route('/')
def home():
    return render_template('souhib/index.html')