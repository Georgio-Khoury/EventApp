import server
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
