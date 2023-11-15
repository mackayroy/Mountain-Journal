import sqlite3


def dict_factory(cursor, row):
    fields = [column[0] for column in cursor.description]
    return {key: value for key, value in zip(fields, row)}

class RoutesDB:
    def __init__(self):
        self.connection = sqlite3.connect("routes_db.db")
        self.connection.row_factory = dict_factory
        self.cursor = self.connection.cursor()

    def createRoute(self,name,type,grade,attempts,rating):
        #don't hard-coded values into the query!
        data = [name,type,grade,attempts,rating]
        self.cursor.execute("INSERT INTO routes (name,type,grade,attempts,rating) VALUES (?,?,?,?,?)", data) #writing to the data base and need to be saved
        self.connection.commit()

    def getRoutes(self):
        self.cursor.execute("SELECT * FROM routes")    #To send query, read only
        routes = self.cursor.fetchall() 
        return routes
    
    def getRoute(self,route_id):
        data = [route_id]
        self.cursor.execute("SELECT * FROM routes WHERE id = ?",data) 
        route = self.cursor.fetchone()
        return route #Will return none if not there

    def updateRoute(self,route_id,name,type,grade,attempts,rating):
        data = [name,type,grade,attempts,rating,route_id]
        self.cursor.execute("UPDATE routes SET name = ?, type = ?, grade = ?, attempts = ?, rating = ? WHERE id = ?",data)
        self.connection.commit()

    def deleteRoute(self,route_id):
        data = [route_id]
        self.cursor.execute("DELETE FROM routes WHERE id=?",data)
        self.connection.commit()

    # Users & sessions

    def createUser(self,firstName,lastName,email,password):
        #don't hard-coded values into the query!
        data = [firstName,lastName,email,password]
        self.cursor.execute("INSERT INTO users (firstName,lastName,email,password) VALUES (?,?,?,?)", data) #writing to the data base and need to be saved
        self.connection.commit()
    
    def checkUser(self,email):
        data = [email]
        self.cursor.execute("SELECT * FROM users WHERE email=?",data)
        users = self.cursor.fetchone() 
        return users

        

# Data binding making sure to keep sql Injection from happening
