#!/usr/bin/env python
import sqlite3
from time import sleep
import sys

conn = sqlite3.connect('people.db', check_same_thread=False)

def main():
    cur = conn.cursor()
    cur.execute('SELECT * FROM PEOPLE')
    print(cur.fetchone())
    return conn.execute('SELECT * FROM PEOPLE')
    
if __name__=="__main__":
    main()
    conn.close()