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
        print(args['update_id'], args['aid'])
        _, recovered, death, confirmed, _, countie = self.getUpdate(args['update_id'])
        self.approve(args['update_id'], args['aid'])
        print(confirmed, death, recovered, countie)
        cur = db.connection.cursor()
        cur.execute(
            """
                UPDATE covid_data
                SET Confirmed = %s, Deaths = %s, Recovered = %s
                where Admin2 = %s;
            """, (confirmed, death, recovered, countie)
        )
        db.connection.commit()
        print(cur.rowcount)
        if cur.rowcount > 0:
            return Response("Record Sucessfully updated", status=200)
        else:
            return Response("Update failed", status=500)

class ApproveFire(Resource):
    def approve(self, update_id, aid):
        cur = db.connection.cursor()
        cur.execute(
            """
            INSERT INTO Administrator_approve_fire_update (Update_id, AID)
            VALUES (%s, %s);
            """, (update_id, aid)
        )
        db.connection.commit()

    def getUpdate(self, update_id):
        cur = db.connection.cursor()
        cur.execute(
            """
            Select * from fire_update where update_id = %s
            """, (update_id,)
        )
        data = cur.fetchall()
        return data[0]

    def post(self):
        params = ['update_id', 'aid']
        for elem in params:
            parser.add_argument(elem)
        args = parser.parse_args()
        _, acres, fireName = self.getUpdate(args['update_id'])
        self.approve(args['update_id'], args['aid'])
        cur = db.connection.cursor()
        cur.execute(
            """
                UPDATE fire_data
                SET incident_acres_burned = %s
                where incident_name = %s;
            """, (acres, fireName)
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

class SendCovidAlert(Resource):

    def getAlert(self):
        cur = db.connection.cursor()
        cur.execute(
            """
            Select * 
            from Alert Al
            where Al.alert_id not in (
                Select A.alert_id
                from Administrators_retrieve_alert A
            );
            """
        )
        data = cur.fetchall()
        return data
    
    def getAlert(self, alert_id):
        cur = db.connection.cursor()
        cur.execute(
            """
            Select Al.message, Al.County
            from Alert Al
            where Al.alert_id = %s
            """, (alert_id,)
        )
        data = cur.fetchall()
        return data

    def getUsersMailByCountie(self, countie):
        cur = db.connection.cursor()
        cur.execute(
            """
            Select Mail from users where countie = %s
            """, (countie,)
        )
        data = cur.fetchall()
        return data
    
    def send_mail(self, receiver, mailObject, message):
        mail = Mail()
        msg = Message(mailObject, sender='coronafirus@no-reply.com', recipients=[receiver])
        msg.body = message
        mail.send(msg)

    def post(self):
        arguments = ['aid', 'alertID']
        for argument in arguments:
            parser.add_argument(argument)
        args = parser.parse_args()
        aid, alertID = [args[x] for x in args]
        alert = self.getAlert(alertID)[0]
        print(alert)
        emails = self.getUsersMailByCountie(alert[1])
        for elem in emails:
            self.send_mail(elem[0], "Covid Alert", alert[0])
        return Response("Alert sent", 200)

# class SendMail(Resource):
#     def send_mail(self, receiver, mailObject, message):
#         mail = Mail()
#         msg = Message(mailObject, sender='coronafirus@no-reply.com', recipients=[receiver])
#         msg.body = message
#         mail.send(msg)

#     def post(self):
#         parser.add_argument('aid')
#         parser.add_argument('shelter')
#         parser.add_argument('message')
#         send_mail()
#         args = parser.parse_args()
#         return Response("Success !!!!!")