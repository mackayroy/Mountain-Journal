from flask import Flask, request
from routes import RoutesDB

class MyFlask(Flask):
    def add_url_rule(self,rule,endpoint=None, view_func=None, **options):
        return super().add_url_rule(rule,endpoint,view_func,provide_automatic_options=False,**options)
          
app = MyFlask(__name__)

@app.route("/routes/<int:route_id>", methods=["OPTIONS"])
def cors_preflight(route_id):
    return "",200,{"Access-Control-Allow-Origin": "*", 
                   "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                   "Access-Control-Allow-Headers": "Content-Type"} 


# Get whole collection
@app.route("/routes", methods=["GET"])
def getRoutes():
    # Load from database
    db = RoutesDB()
    allRoutes = db.getRoutes()
    return allRoutes, 200, {"Access-Control-Allow-Origin": "*"}

# Get single item from collection
@app.route("/routes/<int:route_id>", methods=["GET"])
def getSingleRoute(route_id):
    print("retrieve route with ID:", route_id)
    db = RoutesDB()
    route = db.getRoute(route_id)
    if route:
        return route, 200, {"Access-Control-Allow-Origin": "*"}
    else:
        return "Route with ID {} not found".format(route_id), 404, {"Access-Control-Allow-Origin": "*"}
    
@app.route("/routes", methods=["POST"])
def postingRoutes():
    # Save to database
    name = request.form["Name"]
    type = request.form["Type"]
    grade = request.form["Grade"]
    attempts = request.form["Attempts"]
    rating = request.form["Rating"]
    db = RoutesDB()
    db.createRoute(name,type,grade,attempts,rating)
    return "Created", 201, {"Access-Control-Allow-Origin": "*"}

@app.route("/routes/<int:route_id>", methods=["PUT"])
def updatingRoute(route_id):
    name = request.form["Name"]
    type = request.form["Type"]
    grade = request.form["Grade"]
    attempts = request.form["Attempts"]
    rating = request.form["Rating"]
    db = RoutesDB()
    route = db.getRoute(route_id)
    if route:
        db.updateRoute(route_id,name,type,grade,attempts,rating)
        return "Route with ID {} was Updated".format(route_id), 200,  {"Access-Control-Allow-Origin": "*"}
    else:
        return "Route with ID {} not found".format(route_id), 404, {"Access-Control-Allow-Origin": "*"}
    
@app.route("/routes/<int:route_id>", methods=["DELETE"])
def deleteRoute(route_id):
    db = RoutesDB()
    route = db.getRoute(route_id)
    if route:
        db.deleteRoute(route_id)
        return "Route with ID {} was deleted".format(route_id), 200,  {"Access-Control-Allow-Origin": "*"}
    else:
        return "Route with ID {} not found".format(route_id), 404, {"Access-Control-Allow-Origin": "*"} 

def main():
    app.run(port=8080)

if __name__ == "__main__":
    main()
