import React from 'react';
import { MouseEventHandler, useCallback, useState } from "react";
import ReactDOM from 'react-dom';
import data from "../data.json"

const PEOPLE = "/api/people";

// Declaring type of data
type rowProps = {
    fname: string;
    lname: string;
    age: Number;
};

//post data to server
const handleAdd = async ({ fname, lname, age }: rowProps) => {
    var thisType = "INSERT";
    console.log('testi')
    try
    {
        const fetchResponse = await fetch(PEOPLE, {
            method: 'POST',
            headers: {
                type: thisType,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
           body: JSON.stringify( {
            FNAME : fname,
            LNAME : lname,
            AGE: age
        })
       });

       //waits for server response
       const data = await fetchResponse.json();
       console.log(data);
       return data;
    } catch (e) 
    {
        console.log(e);
        return e;
    }
}
  

function sayHello({ fname, lname, age }: rowProps) {
    alert(fname + lname);
}

function AddButton({ fname, lname, age }: rowProps){ 
//post data to server
const handleAdd = async ({ fname, lname, age }: rowProps) => {
    var thisType = "INSERT";
    try
    {
        const fetchResponse = await fetch(PEOPLE, {
            method: 'POST',
            headers: {
                type: thisType,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
           body: JSON.stringify( {
            FNAME : fname,
            LNAME : lname,
            AGE: age
        })
       });

       //waits for server response
       const data = await fetchResponse.json();
       console.log(data);
       return data;
    } catch (e) 
    {
        console.log(e);
        return e;
    }
}


return <button onClick={() => handleAdd({ fname, lname, age })}>Click Me!</button>
};

export default AddButton;