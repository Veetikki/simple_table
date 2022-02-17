import React from 'react';
import ReactDOM from 'react-dom';

// Declaring type of rows
type rowProps = {
    fname: string;
    lname: string;
    age: Number;
    remove: object;
};

interface Person {
    FNAME: string;
    LNAME: string;
    AGE: Number;
}

// Declaring type of table
type tableProps = {
    key: string;
    reversed: boolean;
    order: "ascn" | "desc";
};

export const Row = ({ fname, lname, age, remove }: rowProps) => 
<tr>
    <td>{fname}</td>
    <td>{lname}</td>
    <td>{age}</td>
    <td>{remove}</td>
</tr>
;

export const Header = () =>
<tr>
    <th>First name</th>
    <th>Last name</th>
    <th>Age</th>
</tr>
;
