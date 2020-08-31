from flask import Response, request, jsonify
from flask_restful import Resource

class Covid(Resource):
    def get(self):
        return jsonify({
            'covid': 'covid'
            })