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

class FireDataAvailable(Resource):
    def directorExist(self, did):
        cur = db.connection.cursor()
        cur.execute(
            """
            Select * from directors where DID = %s
            """, (did)
        )
        return True if cur.rowcount > 0 else False

    def directorIsFires(self, did):
        cur = db.connection.cursor()
        cur.execute(
            """
            Select department from directors where DID = %s
            """, (did)
        )
        return True if cur.fetchall()[0][0] == "Fire" else False

    def get(self):
        parser.add_argument('did')
        args = parser.parse_args()
        did = args['did']
        if (not self.directorExist(did)):
            return Response("Director does not exist", 500)
        if (not self.directorIsFires(did)):
            return Response("This director is not allowed to update fire data", 500)
        cur = db.connection.cursor()
        cur.execute(
            """
            Select *
            from fire_data F
            where F.incident_county in (
                Select D.countie
                from directors D
                where D.DID = %s
            );
            """, (did)
        )
        data = cur.fetchall()
        if (cur.rowcount == 0):
                return Response("No data found!!", 500)
        else:
            row_headers=[x[0] for x in cur.description]
            json_data=[]
            for result in data:
                json_data.append(dict(zip(row_headers,result)))
            cur.close()
            df = pd.DataFrame(json_data)
            return Response(df.to_json(orient="records"), mimetype='application/json')

class CovidDataAvailable(Resource):
    def directorExist(self, did):
        cur = db.connection.cursor()
        cur.execute(
            """
            Select * from directors where DID = %s
            """, (did)
        )
        return True if cur.rowcount > 0 else False

    def get(self):
        did = request.args.get('did')
        if (not self.directorExist(did)):
            return Response("Director does not exist", 500)
        cur = db.connection.cursor()
        cur.execute(
            """
            Select *
            from covid_data C
            where C.Admin2 in (
                Select D.countie
                from directors D
                where D.DID = %s
            );
            """, (did,)
        )
        data = cur.fetchall()
        if (cur.rowcount == 0):
                return Response("No data found!!", 500)
        else:
            row_headers=[x[0] for x in cur.description]
            json_data=[]
            for result in data:
                json_data.append(dict(zip(row_headers,result)))
            cur.close()
            df = pd.DataFrame(json_data)
            return Response(df.to_json(orient="records"), mimetype='application/json')


class DirectorAddFire(Resource):
    def directorExist(self, did):
        cur = db.connection.cursor()
        cur.execute(
            """
            Select * from directors where DID = %s
            """, (did)
        )
        return True if cur.rowcount > 0 else False
    
    def post(self):
        arguments = ['did', 'calfire_incident', 'incident_acres_burned', 'incident_administrative_unit', 'incident_administrative_unit_url', 'incident_containment', 'incident_control', 'incident_cooperating_agencies', 'incident_county', 'incident_date_created', 'incident_date_extinguished', 'incident_date_last_update', 'incident_dateonly_created', 'incident_dateonly_extinguished', 'incident_id', 'incident_is_final', 'incident_latitude', 'incident_location', 'incident_longitude', 'incident_name', 'incident_type', 'incident_url', 'is_active', 'notification_desired']
        for elem in arguments:
            parser.add_argument(elem)
        args = parser.parse_args()
        print(args)
        randomID = ''.join([random.choice(string.ascii_letters + string.digits) for n in range(32)])
        cur = db.connection.cursor()
        cur.execute(
            """
                INSERT INTO fire_add (calfire_incident, incident_acres_burned, incident_administrative_unit, incident_administrative_unit_url, incident_containment, incident_control, incident_cooperating_agencies, incident_county, incident_date_created, incident_date_extinguished, incident_date_last_update, incident_dateonly_created, incident_dateonly_extinguished, fire_add_id, incident_is_final, incident_latitude, incident_location, incident_longitude, incident_name, incident_type, incident_url, is_active, notification_desired)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);
            """, (args['calfire_incident'], args['incident_acres_burned'], args['incident_administrative_unit'], args['incident_administrative_unit_url'], args['incident_containment'], args['incident_control'], args['incident_cooperating_agencies'], args['incident_county'], args['incident_date_created'], args['incident_date_extinguished'], args['incident_date_last_update'], args['incident_dateonly_created'], args['incident_dateonly_extinguished'], randomID, args['incident_is_final'], args['incident_latitude'], args['incident_location'], args['incident_longitude'], args['incident_name'], args['incident_type'], args['incident_url'], args['is_active'], args['notification_desired'])
        )
        data = cur.fetchall()
        db.connection.commit()

        # if (cur.rowcount == 0):
        #     cur = db.connection.cursor()
        #     cur.execute(
        #         """
        #         Select * from Administrators where mail = %s and pwd = %s;
        #         """, (email, password)
        #     )
        #     data = cur.fetchall()
        #     if (cur.rowcount == 0):
        #         return Response("No account found!!")
        # row_headers=[x[0] for x in cur.description]
        # json_data=[]
        # for result in data:
        #     json_data.append(dict(zip(row_headers,result)))
        # cur.close()
        # df = pd.DataFrame(json_data)
        return Response("Success")



class DirectorLogin(Resource):
    def post(self):
        parser.add_argument('email')
        parser.add_argument('password')
        args = parser.parse_args()
        email = args['email']
        password = args['password']
        cur = db.connection.cursor()
        cur.execute(
            """
            Select * from directors where Mail = %s and pwd = %s;
            """, (email, password)
        )
        data = cur.fetchall()
        if (cur.rowcount == 0):
            cur = db.connection.cursor()
            cur.execute(
                """
                Select * from Administrators where mail = %s and pwd = %s;
                """, (email, password)
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

class UpdateCovid(Resource):
    def post(self):
        params = ['confirmed', 'death', 'recovered', 'countie']
        for elem in params:
            parser.add_argument(elem)
        args = parser.parse_args()
        Confirmed, Death, Recovered, Countie = (args['confirmed'], args['death'], args['recovered'], args['countie'])
        try:
            int(Confirmed)
            int(Death)
            int(Recovered)
            str(Countie)
        except:
            return ("Wrong input type", 500)
        dt_string = datetime.now().strftime("%Y/%m/%d %H:%M:%S")
        randomID = ''.join([random.choice(string.ascii_letters + string.digits) for n in range(32)])
        cur = db.connection.cursor()
        cur.execute(
            """
                INSERT INTO Covid_update (Update_id, Confirmed, Recovered, death, dates, countie)
                VALUES (%s, %s, %s, %s, %s, %s);
            """, (randomID, Confirmed, Recovered, Death, dt_string, Countie)
        )
        db.connection.commit()
        if cur.rowcount > 0:
            return Response("Record Sucessfully inserted", status=200)
        else:
            return Response("Insertion failed", status=500)

class UpdateFire(Resource):
    def directorExist(self, did):
        cur = db.connection.cursor()
        cur.execute(
            """
            Select * from directors where DID = %s
            """, (did)
        )
        return True if cur.rowcount > 0 else False

    def post(self):
        parser.add_argument('did')
        parser.add_argument('acres')
        parser.add_argument('containment')
        parser.add_argument('fire_name')
        acres, did, fireName, containment = parser.parse_args()['acres'], parser.parse_args()['did'], parser.parse_args()['fire_name'], parser.parse_args()['containment']
        if (not self.directorExist(did)):
            return Response("Director does not exist", 500)
        randomID = ''.join([random.choice(string.ascii_letters + string.digits) for n in range(32)])
        cur = db.connection.cursor()
        cur.execute(
            """
                INSERT INTO fire_update (Update_id, incident_acres_burned, incident_containment, fire_name)
                VALUES (%s, %s, %s, %s);
            """, (randomID, acres, containment, fireName)
        )
        db.connection.commit()
        if cur.rowcount > 0:
            return Response("Record Sucessfully inserted", status=200)
        else:
            return Response("Insertion failed", status=500)

class AskCovidAlert(Resource):
    def directorData(self, did):
        cur = db.connection.cursor()
        cur.execute(
            """
                Select department, countie from directors where DID = %s
            """, (did)
        )
        data = cur.fetchall()
        return data[0]

    def createCovidAlert(self, date, alertID, alertType, county, message):
        cur = db.connection.cursor()
        cur.execute(
            """
                Insert into Alert (Dates, alert_id, alert_type, County, message)
                Values (%s, %s, %s, %s, %s)
            """, (date, alertID, alertType, county, message)
        )
        db.connection.commit()

    def askForCovidAlert(self, alertID, did):
        cur = db.connection.cursor()
        cur.execute(
            """
                Insert into Director_create_alert (alert_id, DID)
                Values (%s, %s)
            """, (alertID, did)
        )
        db.connection.commit()

    def post(self):
        arguments = ['did', 'message']
        for argument in arguments:
            parser.add_argument(argument)
        args = parser.parse_args()
        did, message = (args['did'], args['message'])
        director = self.directorData(did)
        dt_string = datetime.now().strftime("%Y/%m/%d %H:%M:%S")
        alertID = ''.join([random.choice(string.ascii_letters + string.digits) for n in range(32)])
        self.createCovidAlert(dt_string, alertID, director[0], director[1], message)
        self.askForCovidAlert(alertID, did)
        return Response("Alert created", 200)