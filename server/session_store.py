import os
import base64

class SessionsStore:
    def __init__(self):
        # Initialize our Data
        self.sessionData = {}

    def generateSessionId(self):
        #Generate large number for session ID
        rnum = os.urandom(32)
        rstr = base64.b64encode(rnum).decode("utf-8")
        return rstr

    def createSession(self):
        #make a new sessionId
        sessionId = self.generateSessionId()
        #add a new session to the session store
        self.sessionData[sessionId] = {}
        return sessionId

    def getSession(self,sessionId):
        #Retrieve an existing session from the session store
        if sessionId in self.sessionData:
            return self.sessionData[sessionId]
        else:
            return None

