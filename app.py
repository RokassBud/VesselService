from flask import Flask,request ,render_template
from flask_restful import Api, Resource, reqparse
from models import Lidar, Location,Goal, WaterSensor,db
from flask_cors import CORS, cross_origin
from sqlalchemy import func, asc ,desc
from sqlalchemy import union_all, case

app = Flask(__name__)
cors = CORS(app, resources={
    r"*": {
        "origins": "*"
    }
})  

app.config['CORS_HEADERS'] = 'Content-Type'
#app.config['SQLALCHEMY_DATABASE_URI'] = ''
app.config['SQLALCHEMY_DATABASE_URI'] = ''
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

api = Api(app)
db.init_app(app)

@app.before_first_request
def create_table():
    db.create_all()

@app.route('/',methods=['POST','GET'])
class GPSValues(Resource):
    def get(self):
            locations = Location.query.all()
            # locations = Location.query.order_by(Location.id.desc()).limit(31).all()
            return list (x.json() for x in locations)
    def post(self):
        data = request.get_json()
        new_location = Location(data["SessionID"],data["latitude"],data["longitude"],data["speed"])
        db.session.add(new_location)
        db.session.commit()
        db.session.flush()
        return new_location.json(),201

api.add_resource(GPSValues, '/usr_tbl_gps')

class GoalsView(Resource):
    def get(self):
        goals = Goal.query.all()
        return list (x.json() for x in goals)
    def post(self):
        data = request.get_json()
        new_location = Goal(data["lng"],data["lat"])
        db.session.add(new_location)
        db.session.commit()
        db.session.flush()
        return new_location.json(),201

api.add_resource(GoalsView, '/goal2')

class WaterValues(Resource):
    def get(self):
        water = WaterSensor.query.filter(WaterSensor.DeviceAddress == '30').order_by(WaterSensor.Created.desc()).limit(1).all()
        return list (x.json() for x in water)

api.add_resource(WaterValues, '/usr_tbl_mcusensors')

class LidarValues(Resource):
    def get(self):
        lidars = Lidar.query.order_by(Lidar.id.desc()).limit(1).all()
        return list (x.json() for x in lidars)

api.add_resource(LidarValues, '/usr_tbl_lidar')
     
@app.route('/',methods=['GET'])
class Timeas(Resource):
    def get(date_time):
        date_time = request.args.get("date")
        print(date_time)
        
        return list (x.json() for x in Lidar.query.filter(Lidar.Created < date_time).order_by(Lidar.id.desc()).limit(1).all() ) 


api.add_resource(Timeas, '/date_time')




if __name__ == "__main__":
    app.run(debug=True)