from flask import Response
from flask_restful import Resource
import pandas as pd

class Covid(Resource):
    def get(self):
        df = pd.read_csv(r'E:\Travail\Projets\csc648-02-fa20-team01\application\backend\api\static\10-11-2020.csv')
        df = df[df['Province_State'] == 'California']
        return Response(df.to_json(orient="records"), mimetype='application/json')

class CovidByCountie(Resource):
    def get(self, countie):
        df = pd.read_csv(r'E:\Travail\Projets\csc648-02-fa20-team01\application\backend\api\static\10-11-2020.csv')
        df = df[(df['Province_State'] == 'California') & (df['Admin2'] == countie)]
        if (df.empty) == False:
            return Response(df.to_json(orient="records"), mimetype='application/json')
        else:
            return Response("Countie doesn't exist", 400)
