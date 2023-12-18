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
            passwd="Gkgkgk03847738!",
            database="EventPlanner"
        )
        print("Connected to the database successfully.")
        return db
    except mysql.connector.Error as err:
        print(f"Error blyat: {err}")
        return None



@app.route('/db')
def index():
    try:
        conn = connect_to_database()
        if conn.is_connected():
            cursor = conn.cursor()
            cursor.execute('SELECT * FROM eplanner')  # Replace 'your_table' with your table name
            data = cursor.fetchall()
            cursor.close()
            conn.close()
            return str(data)
    except mysql.connector.Error as e:
        return f"Error connecting to MySQL: {e}"    
    

@app.route('/postings', methods=['POST'])
def handle_post_request():
     if request.method == 'POST':
        try:
            data = request.get_json()  
            firstname = data.get('firstname')
            lastname = data.get('lastname')
            username = data.get('username')
            password = data.get('password')
            email = data.get('email')
            pn = data.get('pn')

            conn = connect_to_database()
            if conn.is_connected():
                cursor = conn.cursor()

                # SQL query to insert data into the database
                sql_query = 'INSERT INTO EUSER VALUES (99,%s, %s,"02-02-2003", %s, %s, %s, %s,10,"03-02-2004",null)'
                values = (firstname, lastname,pn,email, username, password)
                print(sql_query,values)
                cursor.execute(sql_query, values)  # Execute the query with provided values
                conn.commit()  # Commit the transaction

                cursor.close()
                conn.close()

                return jsonify({'message': 'Data inserted successfully'}), 200
        except mysql.connector.Error as e:
            return jsonify({'error': 'Error inserting data into database: ' + str(e)}), 500
        except Exception as ex:
            return jsonify({'error': 'Unhandled exception: ' + str(ex)}), 500
     else:
        return jsonify({'message': 'Method not allowed'}), 405
               

            
      
@app.route('/posting',methods=['POST'])
def postings():
    try:
        conn=connect_to_database()
        if conn.is_connected():
            
            cursor=conn.cursor()
            #conn.start_transaction()
            values = ( 17,"nnns","+961 05040303","wtvsr","private","fsff@gmail.com")
            conn.start_transaction()           
            cursor.execute('INSERT INTO EPLANNER VALUES(17,"nnns","+961 05040303","wtvsr","private","fsff@gmail.com")')
            conn.commit()
           
            cursor.close()
            conn.close()
            
            return "ok"
            
    except mysql.connector.Error as e:
        error_msg = 'Unhandled exception: ' + str(e)
        logging.error(error_msg)
        return jsonify({'error nig': error_msg}), 500  

@app.route("/auth",methods=['POST'])
def authentication():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    
    print( getEUserPass(username))

    if getEUsername(username):

        if getEUserPass(username)==password:
            insertinsession(username)
            
            return jsonify(True) #login
        else:
            print('wrong password')
            return jsonify("Wrong pass")
    else:
        print('no such username')
        return jsonify("Wrong username")

#@app.route('/getEuserPass')
def getEUserPass(username):
    # Connect to the database
    db = connect_to_database()

    if db is not None:
        try:
            # Create a cursor
            my_cursor = db.cursor(dictionary=True)
            
            # Execute the SELECT query
            my_cursor.execute("SELECT password FROM EUSER WHERE username = %s", (username,))

            # Fetch the result
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
            # Close the cursor and database connection
            if my_cursor:
                my_cursor.close()

            # Close the database connection
            #close_database_connection(db)

    else:
        print("Error: Database connection is None.")    

#@app.route('/getEusername')
def getEUsername(username):
    # Connect to the database
    db = connect_to_database()

    if db is not None:
        try:
            # Create a cursor
            my_cursor = db.cursor(dictionary=True)

            # Execute the SELECT query
            my_cursor.execute("SELECT username FROM EUSER WHERE username = %s", (username,))

            # Fetch the result
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
            # Close the cursor and database connection
            if my_cursor:
                my_cursor.close()

            # Close the database connection
            #close_database_connection(db)

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
            venuename= data.get('venuename')
            price = data.get('price')
            phoneNumber = data.get('pn')
            
            plannerusername = data.get('username')
            print(plannerusername) 
            
            db = connect_to_database()
            print('done')
            if db is not None:
                    my_cursor = db.cursor()

                

                
                    # Check if the date is not in the past
                    current_date = datetime.now().date()
                    print(date)
                    print(current_date)
                    provided_date = datetime.strptime(date, "%Y-%m-%d").date()

                    if current_date <= provided_date:
                        print(phoneNumber)
                        # Check constraints for phoneNumber
                        if is_valid_phone_number(phoneNumber):
                            print('in')
                            # Insert data into the EVENT table
                            my_cursor.execute("INSERT INTO EVENT (eventname,date,time,price,phoneNumber,venuename,plannerusername) VALUES (%s, %s, %s, %s, %s, %s, %s)",
                                            (eventname,date,time,price,phoneNumber,venuename,plannerusername))
                            db.commit()
                            print("Data inserted into EVENT table.")
                            return jsonify(True)
                        else:
                            return jsonify("Error: Invalid phoneNumber format.")
                            
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
                row = list(row)  # Convert tuple to list to modify elements

                # Assuming the timedelta field is in the second index (modify this according to your schema)
                if isinstance(row[1], timedelta):
                    # Extract time component from timedelta as string
                    time_seconds = row[1].seconds
                    hours = time_seconds // 3600
                    minutes = (time_seconds % 3600) // 60
                    #seconds = time_seconds % 60

                    formatted_time = f"{hours:02}:{minutes:02}"  # Format time as HH:MM:SS

                    row[1] = formatted_time  # Assuming the time is at the second index in the row
                if isinstance(row[2], date):
                    # Format date as MM DD, YY
                    formatted_date = row[2].strftime('%B %d, %Y')
                    row[2] = formatted_date
                formatted_data.append(row)

           return jsonify(formatted_data)
    except Exception as e:
        logging.error("error from databse",str(e))
    return jsonify("Failed to fetch")        

if __name__=="__main__":
    app.run(debug=True)    
