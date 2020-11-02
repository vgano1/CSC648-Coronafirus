from flask import Response, url_for, current_app, request
from flask_restful import Resource, reqparse
import pandas as pd
import os
from pathlib import Path
from flask_mysqldb import MySQL
from datetime import datetime
import random
import string
from flask_mail import Mail, Message

db = MySQL()
parser = reqparse.RequestParser()

class CreateUser(Resource):

    def post(self):
        params = ['mail', 'pwd', 'countie']
        for elem in params:
            parser.add_argument(elem)
        args = parser.parse_args()
        mail, pwd, countie = [args[x] for x in params]
        userID = ''.join([random.choice(string.ascii_letters + string.digits) for n in range(32)])
        cur = db.connection.cursor()
        cur.execute(
            """
                INSERT INTO users (Mail, pwd, countie)
                VALUES (%s, %s, %s);
            """, (mail, pwd, countie)
        )
        db.connection.commit()
        return Response("User created", 200)