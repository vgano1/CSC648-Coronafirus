from flask import Response, url_for, current_app, request
from flask_restful import Resource, reqparse
import pandas as pd
import os
from pathlib import Path
from flask_mysqldb import MySQL
from datetime import datetime
import random
import string

db = MySQL()
parser = reqparse.RequestParser()

class ApproveCovid(Resource):
    def approve(self, update_id, aid):
        cur = db.connection.cursor()
        cur.execute(
            """
            INSERT INTO Administrator_approved_covid_update (Update_id, AID)
            VALUES (%s, %s);
            """, (update_id, aid)
        )
        db.connection.commit()

    def getUpdate(self, update_id):
        cur = db.connection.cursor()
        cur.execute(
            """
            Select * from Covid_update where Update_id = %s
            """, (update_id,)
        )
        data = cur.fetchall()
        return data[0]

    def post(self):
        params = ['update_id', 'aid']
        for elem in params:
            parser.add_argument(elem)
        args = parser.parse_args()
        _, confirmed, death, recovered, _, countie = self.getUpdate(args['update_id'])
        self.approve(args['update_id'], args['aid'])
        cur = db.connection.cursor()
        cur.execute(
            """
                UPDATE covid_data
                SET Confirmed = %s, Deaths = %s, Recovered = %s
                where Admin2 = %s
            """, (confirmed, death, recovered, countie)
        )
        db.connection.commit()
        if cur.rowcount > 0:
            return Response("Record Sucessfully updated", status=200)
        else:
            return Response("Update failed", status=500)

class CovidUpdates(Resource):

    def administratorExist(self, aid):
        cur = db.connection.cursor()
        cur.execute(
            """
            Select * from Administrators where AID = %s
            """, (aid)
        )
        return True if cur.rowcount > 0 else False
    
    def get(self):
        parser.add_argument('aid')
        args = parser.parse_args()
        if self.administratorExist(args['aid']) == False:
            return Response("Administrators does not exist", 400)
        cur = db.connection.cursor()
        cur.execute(
            """
            Select * from Covid_update where Update_id not in (
	            Select Update_id from Administrator_approved_covid_update
            );
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

class AdministratorLogin(Resource):
    def get(self):
        username = request.args.get('username')
        password = request.args.get('password')
        cur = db.connection.cursor()
        cur.execute(
            """
            Select * from Administrators where Mail = %s and pwd = %s;
            """, (username, password)
        )
        data = cur.fetchall()
        if (cur.rowcount == 0):
            cur = db.connection.cursor()
            cur.execute(
                """
                Select * from Administrators where Mail = %s and pwd = %s;
                """, (username, password)
            )
            data = cur.fetchall()
            if (cur.rowcount == 0):
                return Response("No account found!!")
        row_headers=[x[0] for x in cur.description]
        json_data=[]
        for result in data:
            json_data.append(dict(zip(row_headers,result)))
        cur.close()
        df = pd.DataFrame(json_data)
        return Response(df.to_json(orient="records"), mimetype='application/json')