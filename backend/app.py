import os
from flask import Flask, flash, request, redirect, url_for, session
from werkzeug.utils import secure_filename
import logging
from zipfile import ZipFile
import pandas as pd
import json
from collections import Counter

logging.basicConfig(level=logging.INFO)

logger = logging.getLogger('API')



UPLOAD_FOLDER = ''
ALLOWED_EXTENSIONS = set(['zip'])

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/upload', methods=['POST'])
def fileUpload():
    target=os.path.join(UPLOAD_FOLDER,'.')
    if not os.path.isdir(target):
        os.mkdir(target)
    file = request.files['file'] 
    filename = secure_filename("Data.zip")
    destination="/".join([target, filename])
    file.save(destination)
    response="Dummy"
    logger.info("success")
    return response
@app.route('/getall', methods=['GET'])
def getall():
    startdate = request.args.get('date1')
    enddate = request.args.get('date2')
    history_data_file = "./Data.zip"
    place_visits = []
    with ZipFile(history_data_file) as myzip:
        for file in myzip.filelist[:]:
            filename = file.filename
            
            if "Semantic Location History" in filename:
                history_json = json.load(myzip.open(filename))

                for timeline_object in history_json["timelineObjects"]:
                
                    if "placeVisit" in timeline_object:
                        place_visit_json = timeline_object["placeVisit"]
                        
                        if not "location" in place_visit_json or not "latitudeE7" in place_visit_json["location"]:
                            continue
                        
                        place_visit = {
                            "placeId": place_visit_json["location"]["placeId"],
                            "locationConfidence": place_visit_json["location"]["locationConfidence"],
                            "startTimestamp": place_visit_json["duration"]["startTimestamp"],
                            "endTimestamp": place_visit_json["duration"]["endTimestamp"],
                            "placeVisitImportance": place_visit_json["placeVisitImportance"],
                            "placeVisitType": place_visit_json["placeVisitType"],
                            "latitudeE7": place_visit_json["location"]["latitudeE7"],
                            "longitudeE7": place_visit_json["location"]["longitudeE7"],
                        }
                        
                        for optional_field in ["centerLatE7", "centerLngE7"]:
                            if optional_field in place_visit_json:
                                place_visit[optional_field] = place_visit_json[optional_field]
                            else:
                                place_visit[optional_field] = None
                        
                        for optional_field in ["name", "address"]:
                            if optional_field in place_visit_json["location"]:
                                place_visit[optional_field] = place_visit_json["location"][optional_field]
                            else:
                                place_visit[optional_field] = None
                            
                        place_visits.append(place_visit)

    place_visits_df = pd.DataFrame(place_visits)
    my_trip_places = place_visits_df[
        (place_visits_df.startTimestamp > startdate) & 
        (place_visits_df.startTimestamp < enddate)]
    ret = {"ans":[]}
    for ind in my_trip_places.index:
        if(my_trip_places['name'][ind] is not None):
            ret["ans"].append(my_trip_places['name'][ind].encode("utf-8").decode("utf-8"))
    make_unique = set(ret["ans"])
    ret["ans"] = list(make_unique)
    return ret

@app.route('/get5', methods=['GET'])
def get5():
    startdate = request.args.get('date1')
    enddate = request.args.get('date2')
    history_data_file = "./Data.zip"
    place_visits = []
    with ZipFile(history_data_file) as myzip:
        for file in myzip.filelist[:]:
            filename = file.filename
            
            if "Semantic Location History" in filename:
                history_json = json.load(myzip.open(filename))

                for timeline_object in history_json["timelineObjects"]:
                
                    if "placeVisit" in timeline_object:
                        place_visit_json = timeline_object["placeVisit"]
                        
                        if not "location" in place_visit_json or not "latitudeE7" in place_visit_json["location"]:
                            continue
                        
                        place_visit = {
                            "placeId": place_visit_json["location"]["placeId"],
                            "locationConfidence": place_visit_json["location"]["locationConfidence"],
                            "startTimestamp": place_visit_json["duration"]["startTimestamp"],
                            "endTimestamp": place_visit_json["duration"]["endTimestamp"],
                            "placeVisitImportance": place_visit_json["placeVisitImportance"],
                            "placeVisitType": place_visit_json["placeVisitType"],
                            "latitudeE7": place_visit_json["location"]["latitudeE7"],
                            "longitudeE7": place_visit_json["location"]["longitudeE7"],
                        }
                        
                        for optional_field in ["centerLatE7", "centerLngE7"]:
                            if optional_field in place_visit_json:
                                place_visit[optional_field] = place_visit_json[optional_field]
                            else:
                                place_visit[optional_field] = None
                        
                        for optional_field in ["name", "address"]:
                            if optional_field in place_visit_json["location"]:
                                place_visit[optional_field] = place_visit_json["location"][optional_field]
                            else:
                                place_visit[optional_field] = None
                            
                        place_visits.append(place_visit)

    place_visits_df = pd.DataFrame(place_visits)
    my_trip_places = place_visits_df[
        (place_visits_df.startTimestamp > startdate) & 
        (place_visits_df.startTimestamp < enddate)]
    ret = {"ans":[]}
    for ind in my_trip_places.index:
        if(my_trip_places['name'][ind] is not None):
            ret["ans"].append(my_trip_places['name'][ind].encode("utf-8").decode("utf-8"))
    
    res = [key for key, value in Counter(ret["ans"]).most_common()]
    fin = []
    for i in range(5):
        if i<res.__len__():
            fin.append(res[i])
    ret["ans"] = fin
    return ret

if __name__ == "__main__":
    app.secret_key = os.urandom(24)
    app.run(debug=True,host="0.0.0.0",use_reloader=True)
