#!/usr/bin/env python
import sqlite3

conn = sqlite3.connect('people.db')
print("Opened database successfully")

conn.execute('''CREATE TABLE PEOPLE
         (FNAME TEXT NOT NULL,
         LNAME TEXT NOT NULL,
         AGE INT NOT NULL);''')
print("Table People created successfully")

conn.close()