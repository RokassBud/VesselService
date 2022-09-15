from flask_sqlalchemy import  SQLAlchemy
import simplejson as json
from decimal import Decimal
import datetime

db = SQLAlchemy()

class Location(db.Model):
    __tablename__ = 'usr_tbl_gps'
    id = db.Column(db.Integer, primary_key=True)
    SessionID = db.Column(db.Integer)
    latitude = db.Column(db.Numeric(9,6))
    longitude = db.Column(db.Numeric(9,6))
    speed = db.Column(db.Integer)
    Created = db.Column(db.DateTime(timezone=True))

    def __init__(self,SessionID,latitude,longitude,speed,Created):
        self.SessionID = SessionID
        self.latitude = latitude
        self.longitude = longitude
        self.speed = speed
        self.Created = Created

    def json(self):
        return{ "SessionID":self.SessionID,
        "lat":json.dumps(Decimal(self.latitude)),
        "lng":json.dumps(Decimal(self.longitude)),
        "speed":self.speed,
        "Created":self.Created.isoformat()
    }


class Goal(db.Model):
    __tablename__ = 'goal2'
    id = db.Column(db.Integer, primary_key=True)
    lng = db.Column(db.Numeric(9,6))
    lat = db.Column(db.Numeric(9,6))

    def __init__(self,lng,lat):
        self.lng = lng
        self.lat = lat

    def json(self):
        return{"lng":json.dumps(Decimal(self.lng)),
        "lat":json.dumps(Decimal(self.lat))}

class Lidar(db.Model):
    __tablename__ = 'usr_tbl_lidar'
    id = db.Column(db.Integer, primary_key=True)
    SessionID = db.Column(db.Integer)
    ValueArray = db.Column(db.String(360))
    Created = db.Column(db.DateTime(timezone=True))
    

    def __init__(self,SessionID,ValueArray,Created):
        self.SessionID = SessionID
        self.ValueArray = ValueArray
        self.Created = Created

    def json(self):
        return{"SessionID":self.SessionID,
        "Lidar":self.ValueArray,
        "Created":self.Created.isoformat()}

class WaterSensor(db.Model):
    __tablename__ = 'usr_tbl_mcusensors'
    id = db.Column(db.Integer, primary_key=True)
    SessionID = db.Column(db.Integer)
    DeviceAddress = db.Column(db.Integer)
    SensorValue = db.Column(db.Integer)
    Created = db.Column(db.DateTime(timezone=True))
    

    def __init__(self,SessionID,DeviceAddress,SensorValue,Created):
        self.SessionID = SessionID
        self.DeviceAddress = DeviceAddress
        self.SensorValue = SensorValue
        self.Created = Created

    def json(self):
        return{"SessionID":self.SessionID,
        "DeviceAddress":self.DeviceAddress,
        "SensorValue":self.SensorValue,
        "Created":self.Created.isoformat()}

