from api import create_api

application = create_api()

@application.route('/')
def index():
    return {"Nothing to see": "here"}

if __name__ == "__main__":
    application.run(host='0.0.0.0', debug=True)