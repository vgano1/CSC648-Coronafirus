from flask import Flask, render_template, url_for
from portfolio import create_app

application = create_app()

@application.route('/')
def main():
    return render_template('about.html')

if __name__ == '__main__':
    application.run(host='0.0.0.0', debug=True)