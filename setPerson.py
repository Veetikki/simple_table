#!/usr/bin/env python
import sqlite3
from time import sleep
import sys

conn = sqlite3.connect('people.db', check_same_thread=False)

def main(fname, lname, age):
    conn.execute("INSERT INTO PEOPLE (FNAME, LNAME, AGE) \
            VALUES (?, ?, ?)", [fname, lname, age])
    conn.commit()

if __name__=="__main__":
    main(sys.argv[1], sys.argv[2], sys.argv[3])
    conn.close()