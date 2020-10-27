from flask import Response, url_for, current_app, request
from flask_restful import Resource, reqparse
import pandas as pd
import os
from pathlib import Path
from flask_mysqldb import MySQL

db = MySQL()

class Login(Resource):
    def get(self):
        username = request.args.get('username')
        password = request.args.get('password')
        cur = db.connection.cursor()
        cur.execute(
            """
            Select * from directors where Mail = %s and pwd = %s;
            """, (username, password)
        )
        data = cur.fetchall()
        if (cur.rowcount == 0):
            cur = db.connection.cursor()
            cur.execute(
                """
                Select * from directors where Mail = %s and pwd = %s;
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