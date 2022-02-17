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

function sayHello() {
    alert("HELLO");
}

function AddButton({ fname, lname, age }: rowProps){ 
return <button onClick={() => sayHello()}>Click Me!</button>
};

export default AddButton;