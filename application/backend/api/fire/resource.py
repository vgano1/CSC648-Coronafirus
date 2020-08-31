from flask import jsonify
from flask_restful import Resource

class Fire(Resource):
    def get(self):
        return jsonify({
            'fuego': 'fuego'
            })