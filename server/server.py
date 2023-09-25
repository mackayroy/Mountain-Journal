from flask import Flask, request
from dummydb import DummyDB

# routes = [{"Name": "The Bastille Crack","Type": "Sport", "Grade": "5.7"},
#           {"Name": "Stolen Chimeny","Type": "Trad", "Grade": "5.10b"},
#           {"Name": "Rewritten","Type": "Boulder", "Grade": "5.12c"}]
          
app = Flask(__name__)

@app.route("/routes", methods=["GET"])
def getRoutes():
    # Load from database
    db = DummyDB('mydatabase.db')
    allRecords = db.readAllRecords()
    # print(allRecords)
    return allRecords, 200, {"Access-Control-Allow-Origin": "*"}

@app.route("/routes", methods=["POST"])
def postingRoutes():
    # Save to database
    newRoute = {"Name": request.form["Name"], "Type": request.form["Type"], "Grade": request.form["Grade"]}
    db = DummyDB('mydatabase.db')
    db.saveRecord(newRoute)
    return "Created", 201, {"Access-Control-Allow-Origin": "*"}

def main():
    app.run(port=8080)

if __name__ == "__main__":
    main()
