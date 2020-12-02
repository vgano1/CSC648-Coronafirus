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
        params = ['update_id', 'aid', 'approve']
        for elem in params:
            parser.add_argument(elem)
        args = parser.parse_args()
        print(args['update_id'], args['aid'])
        _, recovered, death, confirmed, _, countie = self.getUpdate(args['update_id'])
        self.approve(args['update_id'], args['aid'])
        print(confirmed, death, recovered, countie)
        if (args['approve']):
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
        else:
            return Response("Update Sucessfully Denied", status=500)

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
        params = ['update_id', 'aid', 'approve']
        for elem in params:
            parser.add_argument(elem)
        args = parser.parse_args()
        _, acres, containment, fireName = self.getUpdate(args['update_id'])
        self.approve(args['update_id'], args['aid'])
        if (args['approve']):
            print(args['update_id'])
            print(args['approve'])
            cur = db.connection.cursor()
            cur.execute(
                """
                    UPDATE fire_data
                    SET incident_acres_burned = %s, incident_containment = %s
                    where incident_name = %s;
                """, (acres, containment, fireName)
            )
            db.connection.commit()
            if cur.rowcount > 0:
                return Response("Record Sucessfully updated", status=200)
            else:
                return Response("Update failed", status=500)
        else:
            return Response("Update Sucessfully denied", status=200)


class NewFires(Resource):

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
            Select * from fire_add where fire_add_id not in (
	            Select fire_add_id from administrator_approve_fire_add
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

class ApproveFireAdd(Resource):
    def approve(self, fire_add_id, aid):
        cur = db.connection.cursor()
        cur.execute(
            """
            INSERT INTO administrator_approve_fire_add (fire_add_id, AID)
            VALUES (%s, %s);
            """, (fire_add_id, aid)
        )
        db.connection.commit()

    def getUpdate(self, update_id):
        cur = db.connection.cursor()
        cur.execute(
            """
            Select * from fire_add where fire_add_id = %s
            """, (update_id,)
        )
        data = cur.fetchall()
        return data[0]

    def post(self):
        params = ['update_id', 'aid', 'approve']
        for elem in params:
            parser.add_argument(elem)
        args = parser.parse_args()
        data = self.getUpdate(args['update_id'])
        self.approve(args['update_id'], args['aid'])
        if (args['approve']):
            cur = db.connection.cursor()
            cur.execute(
                """
                    INSERT INTO fire_data (incident_id, incident_name, incident_is_final, incident_date_last_update, incident_date_created, incident_administrative_unit, incident_administrative_unit_url, incident_location, incident_county, incident_control, incident_cooperating_agencies, incident_type, incident_url, incident_date_extinguished, incident_dateonly_extinguished, incident_dateonly_created, is_active, calfire_incident, notification_desired, incident_acres_burned, incident_containment, incident_longitude, incident_latitude)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);
                """, data
            )
            db.connection.commit()
            if cur.rowcount > 0:
                return Response("Record Sucessfully added", status=200)
            else:
                return Response("Add failed", status=500)
        else:
            return Response("Add Sucessfully denied", status=200)




class FireUpdates(Resource):

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
            Select * from fire_update where Update_id not in (
	            Select Update_id from Administrator_approve_fire_update
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


class CovidAlerts(Resource):

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
            Select * from fire_update where Update_id not in (
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

class GetAlerts(Resource):
    def get(self):
        parser.add_argument('aid')
        aid = parser.parse_args()['aid'] # getting the administrator ID
        cur = db.connection.cursor()
        cur.execute( # Getting all alerts that did not get approve
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
        row_headers = [x[0] for x in cur.description]
        json_data = []
        for result in data: # Creating the JSON that will contains all the alerts
            json_data.append(dict(zip(row_headers, result)))
        cur.close()
        df = pd.DataFrame(json_data)
        return Response(df.to_json(orient="records"), mimetype='application/json')


class SendAlert(Resource):

    def getAllAlerts(self):
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
            Select Al.message, Al.County, Al.alert_type
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
        msg = Message(mailObject, sender='trabelsisouhib@gmail.com', recipients=[receiver])
        msg.body = message
        mail.send(msg)

    def confirmAlert(self, alertID, aid):
        cur = db.connection.cursor()
        cur.execute(
            """
            INSERT INTO Administrators_retrieve_alert (alert_id, AID)
            VALUES (%s, %s);
            """, (alertID, aid)
        )
        db.connection.commit()

    def post(self):
        arguments = ['aid', 'alertID', 'approve']
        for argument in arguments:
            parser.add_argument(argument)
        args = parser.parse_args()
        aid, alertID, approve = (args['aid'], args['alertID'], args['approve'])
        print(self.getAlert(alertID)[0])
        alert = self.getAlert(alertID)[0]
        print(alertID, aid, approve)
        self.confirmAlert(alertID, aid)
        print(alert)
        if (approve.lower() == 'true'):
            emails = self.getUsersMailByCountie(alert[1])
            for elem in emails:
                print(elem)
                if (alert[2] == 'Health'):
                    self.send_mail(elem[0], "Covid Alert", alert[0])
                else:
                    self.send_mail(elem[0], "Fire Alert", alert[0])
        return Response("OK", 200)

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