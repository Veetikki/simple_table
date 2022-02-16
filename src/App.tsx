import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Row, Header} from './components/table';
import AddButton from './components/buttons';
import { MouseEventHandler, useCallback, useState, useEffect } from "react";
import axios from 'axios';

interface Person {
  FNAME: string;
  LNAME: string;
  AGE: Number;
}

function App() {
  const PEOPLE = "/api/people";
  const [people, setPeople] = useState<Person[]>([]);

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

  return (
    <div>
    <table>
    <Header/>
    {people.map((person) => {
        console.log(person.AGE);
        return(<Row fname={person.FNAME} lname={person.LNAME} age={person.AGE}/>);
      })}
    </table>
    <AddButton fname="Testi" lname="Testinen" age={15} />
    </div>
  );
}

export default App;
