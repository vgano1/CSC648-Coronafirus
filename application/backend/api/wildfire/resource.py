from flask import Response, request, jsonify, url_for, Response
from flask_restful import Resource
import pandas as pd

class Fires(Resource):
    def get(self):
        df = pd.read_csv(r'E:\Travail\Projets\csc648-02-fa20-team01\application\backend\api\static\mapdataall.csv')
        return Response(df.to_json(orient="records"), mimetype='application/json')

class FireByCountie(Resource):
    def get(self, countie):
        df = pd.read_csv(r'E:\Travail\Projets\csc648-02-fa20-team01\application\backend\api\static\mapdataall.csv')
        df = df[df['incident_county'] == countie]
        if (df.empty) == False:
            return Response(df.to_json(orient="records"), mimetype='application/json')
        else:
            return Response("Countie doesn't exist", 400)
