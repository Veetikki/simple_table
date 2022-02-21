#!/usr/bin/env python
import sqlite3

conn = sqlite3.connect('people.db')
print("Opened database successfully")

conn.execute('''CREATE TABLE PEOPLE
        (ID INT NOT NULL,
        FNAME TEXT NOT NULL,
        LNAME TEXT NOT NULL,
        AGE INT NOT NULL,
        PRIMARY KEY (ID));''')
print("Table People created successfully")

conn.close()