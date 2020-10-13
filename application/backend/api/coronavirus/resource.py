import os
import pandas as pd
from pathlib import Path
from flask import Response, jsonify
from flask_restful import Resource
from api import db
import json

basedir = Path(os.path.abspath(os.path.dirname(__file__))).parent
data_file = os.path.join(basedir, 'static\\10-11-2020.csv')

class Covid(Resource):
    def get(self):
        cur = db.connection.cursor() # create a cursor
        cur.execute(
            """
            Select * from covid_data where Province_State = 'California';
            """
        )
        data = cur.fetchall()
        row_headers=[x[0] for x in cur.description] #this will extract row headers
        json_data=[]
        for result in data:
            json_data.append(dict(zip(row_headers,result)))
        cur.close()
        df = pd.DataFrame(json_data)
        return Response(df.to_json(orient="records"), mimetype='application/json')

class CovidByCountie(Resource):
    def get(self, countie):
        cur = db.connection.cursor() # create a cursor
        cur.execute(
            """
            Select * from covid_data where Province_State = 'California' and Admin2 = %s;
            """, (countie,)
        )
        data = cur.fetchall()
        row_headers=[x[0] for x in cur.description] #this will extract row headers
        json_data=[]
        for result in data:
            json_data.append(dict(zip(row_headers,result)))
        cur.close()
        df = pd.DataFrame(json_data)

        if (df.empty) == False:
            return Response(df.to_json(orient="records"), mimetype='application/json')
        else:
            return Response("Countie doesn't exist", 400)