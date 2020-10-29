from flask import Response, url_for, current_app
from flask_restful import Resource
import pandas as pd
import os
from pathlib import Path
from flask_mysqldb import MySQL

db = MySQL()

class FireList(Resource):
    def get(self):
        cur = db.connection.cursor()
        cur.execute(
            """
            Select * from fire_data where incident_type = 'Wildfire';
            """
        )
        data = cur.fetchall()
        row_headers=[x[0] for x in cur.description]
        json_data=[]
        for result in data:
            json_data.append(dict(zip(row_headers,result)))
        cur.close()
        df = pd.DataFrame(json_data)
        return Response(df.to_json(orient="records"), mimetype='application/json')

class FireByCountie(Resource):
    def get(self, countie):
        cur = db.connection.cursor()
        cur.execute(
            """
            Select * from fire_data where incident_type = 'Wildfire' and incident_county = %s;
            """, (countie,)
        )
        data = cur.fetchall()
        row_headers=[x[0] for x in cur.description]
        json_data=[]
        for result in data:
            json_data.append(dict(zip(row_headers,result)))
        cur.close()
        df = pd.DataFrame(json_data)
        if (df.empty) == False:
            return Response(df.to_json(orient="records"), mimetype='application/json')
        else:
            return Response("Countie doesn't exist", 400)

class FireByName(Resource):
    def get(self, name):
        cur = db.connection.cursor()
        cur.execute(
            """
            Select * from fire_data where incident_type = 'Wildfire' and incident_name = %s;
            """, (name,)
        )
        data = cur.fetchall()
        row_headers=[x[0] for x in cur.description]
        json_data=[]
        for result in data:
            json_data.append(dict(zip(row_headers,result)))
        cur.close()
        df = pd.DataFrame(json_data)
        if (df.empty) == False:
            return Response(df.to_json(orient="records"), mimetype='application/json')
        else:
            return Response("Countie doesn't exist", 400)