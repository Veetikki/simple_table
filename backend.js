const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const app = express();
var bodyParser  = require('body-parser');

app.use(bodyParser.json())
app.get('/', (req, res) => {
  res.send('Hello world');
});

// get api
app.get('/api/people', (req, res)=>{
  let db = new sqlite3.Database('people.db', (err) => {
    if(err) 
    {
      console.error(err.message);
    }
    else
    {
      console.log('Connected to the people.db.');
      let sql = `SELECT * FROM people`;

      db.all(sql, [], (err, rows)=>{
        if(err)
        {
          res.send(err);
        }
        
        res.json(rows);
        
      });    
    }
  });

  db.close();
});

// Post data to api
app.post('/api/people', (req, res) => {
  var postData  = req.body;
  var type = req.headers.type;

  let db = new sqlite3.Database('people.db', (err) => {
    if(err) 
    {
      console.error(err.message);
    }
    else
    {
      console.log('Connected to the people.db.');
      console.log(postData)
      console.log(type)
      var sql;

      if(type === "INSERT")
      {
        console.log("inserted")
        sql = `INSERT INTO PEOPLE (ID, FNAME, LNAME, AGE) VALUES(?,?,?,?)`;
        db.run(sql, [postData.ID, postData.FNAME, postData.LNAME, postData.AGE], function(err) {
          if (err) {
            return console.log(err.message);
          }
          res.end(JSON.stringify(`Rows inserted ${this.changes}`))
        });
      }
      else if(type=== "UPDATE")
      {
        console.log("updated")
        sql = `UPDATE PEOPLE SET FNAME = ?, LNAME = ?, AGE = ? WHERE ID = ?`;
        db.run(sql, [postData.FNAME, postData.LNAME, postData.AGE, postData.ID], function(err) {
          if (err) {
            return console.log(err.message);
          }
          res.end(JSON.stringify(`Rows updated ${this.changes}`))
        });
      }
      else
      {
        console.log("deleted")
        sql = `DELETE FROM PEOPLE WHERE ID=?`;
        db.run(sql, [postData.ID], function(err) {
        if (err) {
          return console.log(err.message);
        }
        res.end(JSON.stringify(`Rows deleted ${this.changes}`))
      });
      }
    }

  });
  db.close();
});

const port = 4000;
app.listen(port, () => console.log(`Server started on port ${port}`));