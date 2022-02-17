import React from 'react';
import './App.css';
import {Row, Header} from './components/table';
import AddButton from './components/buttons';
import { MouseEventHandler, useCallback, useState, useEffect } from "react";
import { RecordWithTtl } from 'dns';

interface Person {
  FNAME: string;
  LNAME: string;
  AGE: Number;
}

function App() {
  const PEOPLE = "/api/people";
  const [people, setPeople] = useState<Person[]>([]);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [age, setAge] = useState(0);

  const getData=()=>{
      fetch(PEOPLE
      ,{
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
      )
      .then(function(response){
      console.log('Getting people')
      console.log(response)
      return response.json();
      })
      .then(function(myJson) {
      console.log(myJson);
      setPeople(myJson);
      });
    }
    useEffect(()=>{
      getData()
  },[])

  //post data to server
  const handleSubmit=()=>{
  fetch(PEOPLE
  ,{
    method: 'POST',
    headers: {
        type: 'INSERT',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify( {
    FNAME : fname,
    LNAME : lname,
    AGE : age
    })
  })
  .then(function(response){
  console.log("POST ERROR")
  console.log(response)
  return response.json();
  })
  .then(function(myJson) {
  console.log(myJson);
  setPeople(myJson);
  });
  }

  //post data to server
  const handleRemove=( f:String, l:String, a:Number )=>{
    fetch(PEOPLE
    ,{
      method: 'POST',
      headers: {
          type: 'DELETE',
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify( {
      FNAME : f,
      LNAME : l,
      AGE : a
      })
    })
    .then(function(response){
    console.log(response);
    return response.json();
    })
    .then(function(myJson) {
    console.log(myJson);
    setPeople(myJson);
    console.log("Updating list")
    });
  }

  return (
    <div>
    <table>
    <thead>
    <Header/>
    </thead>
    <tbody>
    {people.map((person) => {
        return(<Row fname={person.FNAME} lname={person.LNAME} age={person.AGE} remove={<button onClick={() => handleRemove(person.FNAME, person.LNAME, person.AGE)}>Remove</button>}/>);
    })}
    </tbody>
    </table>
    <form onSubmit={handleSubmit}>
    <label>
      First name:
      <input type="text" value={fname} onChange={e => setFname(e.target.value)} />
    </label>
    <label>
      Last name:
      <input type="text" value={lname} onChange={e => setLname(e.target.value)} />
    </label>
    <label>
      Age:
      <input type="number" value={age} onChange={e => setAge(parseInt(e.target.value))} />
    </label>
    <input type="submit" value="Add" />
    </form>
    </div>
  );
}

export default App;
