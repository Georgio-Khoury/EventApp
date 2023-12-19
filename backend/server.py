from flask import Flask,jsonify,request, session
from flask_cors import CORS
import json
import mysql.connector
import logging,re
from datetime import datetime,timedelta,date


app = Flask(__name__)
CORS(app,supports_credentials=True)
app.secret_key="12345"
app.permanent_session_lifetime = timedelta(days=7)

def connect_to_database():
    try:
        db = mysql.connector.connect(
            host="localhost",
            user="root",
            passwd="",
            database="App"
        )
        print("Connected to the database successfully.")
        return db
    except mysql.connector.Error as err:
        print(f"Error blyat: {err}")
        return None






               

            
      

@app.route("/auth",methods=['POST'])
def authentication():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    
    print( getEUserPass(username))

    if getEUsername(username):

        if getEUserPass(username)==password:
            insertinsession(username)
            
            return jsonify(True) 
        else:
            print('wrong password')
            return jsonify("Wrong pass")
    else:
        print('no such username')
        return jsonify("Wrong username")


def getEUserPass(username):
   
    db = connect_to_database()

    if db is not None:
        try:
            
            my_cursor = db.cursor(dictionary=True)
            
           
            my_cursor.execute("SELECT password FROM EUSER WHERE username = %s", (username,))
           # my_cursor.execute(f"SELECT password FROM EUSER WHERE username = {username}") #i was trying sql injections lol
            
            euser = my_cursor.fetchone()
            
            if euser:
                print("EUSER password found:")
                print(euser.get('password'))
                return euser.get('password')
            else:
                print(f"No EUSER password found with username {username}")

        except Exception as e:
            print(f"Error getting EUSER: {e}")
        finally:
           
            if my_cursor:
                my_cursor.close()

          

    else:
        print("Error: Database connection is None.")    


def getEUsername(username):
    
    db = connect_to_database()

    if db is not None:
        try:
            
            my_cursor = db.cursor(dictionary=True)

           
            my_cursor.execute("SELECT username FROM EUSER WHERE username = %s", (username,))
            #my_cursor.execute(f"SELECT username FROM EUSER WHERE username = {username}") i was trying sql injections lol
            
            euser = my_cursor.fetchone()

            if euser:
                print("EUSER found:")
                print(euser)
                return str(euser)
            else:
                print(f"No EUSER found with username {username}")

        except Exception as e:
            print(f"Error getting EUSER: {e}")
        finally:
            
            if my_cursor:
                my_cursor.close()

          

    else:
        print("Error: Database connection is None.")


def insertinsession(username):
    db=connect_to_database()
    if db is not None:
        try:
             my_cursor=db.cursor(dictionary=True)
             
             my_cursor.execute("SELECT * FROM EUSER WHERE USERNAME= %s",(username,))
             print('here')
             euser= my_cursor.fetchone()
             session.permanent = True
             session['username']= username
             print(session.get('username') ," this is username")
             session['firstname'] = euser.get('firstName')
             session['lastName'] = euser.get('lastName')
             session['dob'] = euser.get('dateOfBirth')
             session['pn']= euser.get('phonenb')

             my_cursor.execute("SELECT * FROM EPLANNER WHERE PLANNERUSERNAME = %s",(username,))
             eusure=my_cursor.fetchone()
             if eusure:
                 session['sub'] = True
             else:
                 session['sub']= False    
        finally:
                
            my_cursor.close()

@app.route("/status",methods=['POST'])      
def statuscheck():
    data = request.get_json()
    username=data.get('username')
    db=connect_to_database()
    if db is not None:
        try:
            my_cursor=db.cursor(dictionary=True)
            my_cursor.execute("SELECT * FROM EPLANNER WHERE PLANNERUSERNAME = %s",(username,))
            eusure=my_cursor.fetchone()
            if eusure :
                print("sub is active")
                return jsonify(True)
            else:
                return jsonify(False)
        finally:
            my_cursor.close()

def is_valid_phone_number(phone_number):
    pattern = re.compile(r'^\+961 \d{8}$')
    match = pattern.match(phone_number)
    return bool(match)
@app.route('/event', methods=['POST'])    
def addEvent():
     if request.method == 'POST':
       
        try:
            print('enter')
            data = request.get_json() 
            print(data)
            status = data.get('status')
            print(status," this is the status from frontend")
            print(session.get('pn'))
            if status==False:
                return jsonify("not an eplanner") 
          
            eventname=data.get('Eventname')
            print('got')
            date = data.get('eventDate')
            time = data.get('time')
            endtime=data.get('endtime')
            venuename= data.get('venuename')
            price = data.get('price')
           
            
            plannerusername = data.get('username')
            print(plannerusername) 
            if time > endtime:
                return jsonify('Start time is after end time')
            db = connect_to_database()
            print('done')
            if db is not None:
                    try:    
                        my_cursor = db.cursor()
                        my_cursor.execute(f"SELECT COUNT(*) AS DUP FROM EVENT NATURAL JOIN VENUE GROUP BY VENUENAME,DATE,TIME,ENDTIME HAVING TIME BETWEEN '{time}' AND '{endtime}' AND VENUENAME='{venuename}' ")
                    
                        checker=my_cursor.fetchall()
                        print("checker",checker)
                        if(checker):
                            return jsonify('Not an available time slot')


                    except Exception as e:
                        logging.error(str(e))
                  
                    current_date = datetime.now().date()
                    print(date)
                    print(current_date)
                    provided_date = datetime.strptime(date, "%Y-%m-%d").date()

                    if current_date <= provided_date:
                       
                        my_cursor.execute("select phonenumber from eplanner where plannerusername = %s",(plannerusername,))
                        phoneNumberTupple = my_cursor.fetchone()
                        phoneNumber = phoneNumberTupple[0]
                        print(phoneNumber)
                        
                        my_cursor.execute("INSERT INTO EVENT (eventname,date,time,endtime,price,phoneNumber,venuename,plannerusername) VALUES (%s, %s, %s, %s, %s, %s, %s,%s)",
                                            (eventname,date,time,endtime,price,phoneNumber,venuename,plannerusername))
                        db.commit()
                        print("Data inserted into EVENT table.")
                        return jsonify(True)
                    
                            
                    else:
                        return jsonify("Error: The provided date is in the past.")
               

                
            else:
                print("Error: Database connection is None.")
               # return jsonify({'message': 'Data inserted successfully'}), 200
        except mysql.connector.Error as e:
            return jsonify({'error': 'Error inserting data into database: ' + str(e)}), 500
        except Exception as ex:
            logging.error(str(ex))
            return jsonify({'error': 'Unhandled exception: ' + str(ex)}), 500
     else:
        return jsonify({'message': 'Method not allowed'}), 405


@app.route('/logout',methods=["POST"])
def logout():
    session.clear()
    return jsonify('True')
@app.route('/addSubscription',methods=['POST'])
def sub():
    try:    
        data = request.get_json()
        print(data)
        username = data.get('username')
        phone = data.get('phone')
        email = data.get('email')
        subnum = data.get('subnum')

        db=connect_to_database()
        if db is not None:    
            cursor = db.cursor()
            cursor.execute("INSERT INTO EPLANNER (PLANNERUSERNAME,PHONENUMBER,EMAIL,subnum) VALUES(%s,%s,%s,%s)",(username,phone,email,subnum))
            db.commit()
           

    except Exception as ex:
        logging.error(str(ex))
        return jsonify("You are already subscribed")
    return jsonify("You are subscribed")
@app.route('/register',methods=['POST'])
def register():
    try:
        data = request.get_json()
        username = data.get('username')
        eventname= data.get('eventName')
        db = connect_to_database()
        if db is not None:
            cursor = db.cursor()
            cursor.execute("INSERT INTO REGISTERS(USERNAME,EVENTNAME) VALUES(%s,%s)",(username,eventname))
            db.commit()
    except Exception as ex:
        logging.error("Error from Database",str(ex))
        if '1062' in str(ex):
            return jsonify("You are already registered for this event")

    return jsonify(True)

@app.route("/getevents",methods=["GET"])
def getevents():
    try:
       db= connect_to_database()
       if db is not None:
           cursor=db.cursor()
           cursor.execute('SELECT eventname,time,date,price,phonenumber,venuename,location,capacity FROM EVENT NATURAL JOIN VENUE')
           data = cursor.fetchall()
          
           formatted_data = []
           for row in data:
                row = list(row)  

                
                if isinstance(row[1], timedelta):
                   
                    time_seconds = row[1].seconds
                    hours = time_seconds // 3600
                    minutes = (time_seconds % 3600) // 60
                    #seconds = time_seconds % 60

                    formatted_time = f"{hours:02}:{minutes:02}"  

                    row[1] = formatted_time  
                if isinstance(row[2], date):
                    
                    formatted_date = row[2].strftime('%B %d, %Y')
                    row[2] = formatted_date
                formatted_data.append(row)

           return jsonify(formatted_data)
    except Exception as e:
        logging.error("error from databse",str(e))
    return jsonify("Failed to fetch")        


@app.route("/getMyevents/<username>",methods=["GET"])
def getMyevents(username):
    try:
       db= connect_to_database()
       if db is not None:
           cursor=db.cursor()
           cursor.execute('SELECT eventname,time,date,price,phonenumber,venuename,location,capacity FROM EVENT NATURAL JOIN VENUE where plannerusername=%s',(username,))
           data = cursor.fetchall()
          
           formatted_data = []
           for row in data:
                row = list(row)  

                
                if isinstance(row[1], timedelta):
                    
                    time_seconds = row[1].seconds
                    hours = time_seconds // 3600
                    minutes = (time_seconds % 3600) // 60
                    #seconds = time_seconds % 60

                    formatted_time = f"{hours:02}:{minutes:02}"  

                    row[1] = formatted_time  
                if isinstance(row[2], date):
                    
                    formatted_date = row[2].strftime('%B %d, %Y')
                    row[2] = formatted_date
                formatted_data.append(row)

           return jsonify(formatted_data)
    except Exception as e:
        logging.error("error from databse",str(e))
    return jsonify("Failed to fetch") 


@app.route("/addEUser",methods=["POST"])
def registration():
    try:
        data = request.get_json()
        firstname = data.get('fn')
        lastname = data.get('ln')
        username = data.get('username')
        password= data.get('password')
        dob = data.get('dob')
        email = data.get('email')
        pn = data.get('pn')
        db=connect_to_database()
        joindate  = datetime.now().strftime('%Y-%m-%d')
        if db is not None :
            cursor = db.cursor()
            cursor.execute("INSERT INTO EUSER (firstname,lastname,dateofbirth,phonenb,email,username,password,joindate) VALUES(%s,%s,%s,%s,%s,%s,%s,%s)"
                           ,(firstname,lastname,dob,pn,email,username,password,joindate))
            db.commit()
            return jsonify(True)
    except Exception as e:
          logging.error(str(e))  
    return jsonify(False)


@app.route("/fn",methods=['POST'])
def fn():
    data = request.get_json()
    username = data.get('username')
    try:
        db=connect_to_database()
        if db is not None:
            cursor = db.cursor()
            cursor.execute("SELECT firstname from EUSER where username = %s",(username,))
            fn = cursor.fetchone()
            return jsonify(fn)

    except Exception as e:
        logging.error(str(e))
        return jsonify('failed to fetch')
    return jsonify("error getting data")

@app.route("/ln",methods=['POST'])
def ln():
    data = request.get_json()
    username = data.get('username')
    try:
        db=connect_to_database()
        if db is not None:
            cursor = db.cursor()
            cursor.execute("SELECT lastname from EUSER where username = %s",(username,))
            ln = cursor.fetchone()
            return jsonify(ln)

    except Exception as e:
        logging.error(str(e))
        return jsonify('failed to fetch')
    return jsonify("error getting data")


@app.route("/pn",methods=['POST'])
def pn():
    data = request.get_json()
    username = data.get('username')
    try:
        db=connect_to_database()
        if db is not None:
            cursor = db.cursor()
            cursor.execute("SELECT phonenb from EUSER where username = %s",(username,))
            pn = cursor.fetchone()
            return jsonify(pn)

    except Exception as e:
        logging.error(str(e))
        return jsonify('failed to fetch')
    return jsonify("error getting data")

@app.route('/getServices')
def getServices():
    try:
        db = connect_to_database()
        if db is not None:
            cursor = db.cursor()
            cursor.execute("select provider from Services")
            data = cursor.fetchall()
            return jsonify(data)
    except Exception as e:
        logging.error(str(e))
        return jsonify("Failed")
    return jsonify(False)

@app.route('/addServes',methods=['POST'])
def addServes():
    data = request.get_json()
    eventname = data.get('eventName')
    provider = data.get('provider')
    print(provider)
    try:
        db =connect_to_database()
        cursor= db.cursor()
        cursor.execute('Insert INTO SERVES(provider,eventName) VALUES (%s,%s)',(provider,eventname))
        db.commit()

    except Exception as e:
        logging.error(str(e))    
        return jsonify('Failed')
    return jsonify(True)

@app.route('/deleteEvent',methods=['POST'])
def deleteEvent():
    data= request.get_json()
    eventname = data.get('eventName')
    
    try:
        db = connect_to_database()
        cursor = db.cursor()
        cursor.execute("DELETE FROM EVENT WHERE  eventname=(%s)",(eventname,))
        db.commit()

    except Exception as e:
        logging(str(e))
        return jsonify('Failed')
    return jsonify('True')



if __name__=="__main__":
    app.run(debug=True)    
