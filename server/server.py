from flask import Flask, request, g
from routes import RoutesDB
from passlib.hash import bcrypt
from session_store import SessionsStore

session_store = SessionsStore()

class MyFlask(Flask):
    def add_url_rule(self,rule,endpoint=None, view_func=None, **options):
        return super().add_url_rule(rule,endpoint,view_func,provide_automatic_options=False,**options)
          
def load_session_data():
    print("The cookies: ", request.cookies)
    #Load the session ID from cookie data
    session_id = request.cookies.get("session_id")
    
    # if session ID is present:
    if session_id:
        # Load the session data using the session ID
        session_data = session_store.getSession(session_id)

    #if session ID is missing or invalid:
    if session_id == None or session_data == None:
        #Create a new session & session ID
        session_id = session_store.createSession()
        #Load the session data using the session ID
        session_data = session_store.getSession(session_id)
    
    #Save session ID and session data for other use
    g.session_id = session_id
    g.session_data = session_data

app = MyFlask(__name__)

@app.before_request
def before_request_func():
    load_session_data()

@app.after_request
def after_request_func(response):
    print("session ID: ", g.session_id)
    print("session data: ", g.session_data)
    #Send a cookie to the client with the session ID
    response.set_cookie("session_id", g.session_id, samesite="None", secure=True)

    response.headers["Access-Control-Allow-Origin"] = request.headers.get("Origin")
    response.headers["Access-Control-Allow-Credentials"] = "true"
    return response

@app.route("/routes/<int:route_id>", methods=["OPTIONS"])
def cors_preflight(route_id):
    return "",200,{ "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                   "Access-Control-Allow-Headers": "Content-Type"} 



# Get whole collection
@app.route("/routes", methods=["GET"])
def getRoutes():
    # Load from database
    if "userID" not in g.session_data:
        return "Unauthorized", 401
    db = RoutesDB()
    allRoutes = db.getRoutes()
    return allRoutes, 200

# Get single item from collection
@app.route("/routes/<int:route_id>", methods=["GET"])
def getSingleRoute(route_id):
    if "userID" not in g.session_data:
        return "Unauthorized", 401
    print("retrieve route with ID:", route_id)
    db = RoutesDB()
    route = db.getRoute(route_id)
    if route:
        return route, 200
    else:
        return "Route with ID {} not found".format(route_id), 404 
    
@app.route("/routes", methods=["POST"])
def postingRoutes():
    if "userID" not in g.session_data:
        return "Unauthorized", 401
    # Save to database
    name = request.form["Name"]
    type = request.form["Type"]
    grade = request.form["Grade"]
    attempts = request.form["Attempts"]
    rating = request.form["Rating"]
    db = RoutesDB()
    db.createRoute(name,type,grade,attempts,rating)
    return "Created", 201 

@app.route("/routes/<int:route_id>", methods=["PUT"])
def updatingRoute(route_id):
    if "userID" not in g.session_data:
        return "Unauthorized", 401
    name = request.form["Name"]
    type = request.form["Type"]
    grade = request.form["Grade"]
    attempts = request.form["Attempts"]
    rating = request.form["Rating"]
    db = RoutesDB()
    route = db.getRoute(route_id)
    if route:
        db.updateRoute(route_id,name,type,grade,attempts,rating)
        return "Route with ID {} was Updated".format(route_id), 200
    else:
        return "Route with ID {} not found".format(route_id), 404
    
@app.route("/routes/<int:route_id>", methods=["DELETE"])
def deleteRoute(route_id):
    if "userID" not in g.session_data:
        return "Unauthorized", 401
    db = RoutesDB()
    route = db.getRoute(route_id)
    if route:
        db.deleteRoute(route_id)
        return "Route with ID {} was deleted".format(route_id), 200
    else:
        return "Route with ID {} not found".format(route_id), 404 

# For Users

@app.route("/users", methods=["POST"])
def createUser():
    # Save to database
    email = request.form["Email"]
    db = RoutesDB()
    check  = db.checkUser(email)
    if check == None:
        firstName = request.form["firstName"]
        lastName = request.form["lastName"]
        password = request.form["Password"]
        password = bcrypt.hash(password)
        db.createUser(firstName,lastName,email,password)
        return "Created", 201
    else:
        return "Email Used Already",422
    
@app.route("/sessions", methods=["POST"])
def createSession():
    email = request.form["Email"]
    db = RoutesDB()
    check  = db.checkUser(email)
    if check != None:
        password = request.form["Password"]
        userFromServer = db.checkUser(email)
        if bcrypt.verify(password,userFromServer["password"]):
            g.session_data["userID"] = userFromServer["id"]
            return "Signed In", 201
        else:
            return "Failed Sign In", 401
            # Failed Password
    else:
        return "Failed Sign In", 401
        # Failed Email

def main():
    app.run(port=8080)

if __name__ == "__main__":
    main()



