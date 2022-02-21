import '../App.css';
import { useState } from "react";

// Declaring type of rows
type rowProps = {
    id: string;
    fname: string;
    lname: string;
    age: number;
    remove: object;
    edit: Function;
};

type headerProps = {
    fSort: object;
    lSort: object;
    aSort: object;
};

export function Row({id, fname, lname, age, remove, edit }: rowProps) {
const [isEditing, setIsEditing] = useState(false);
const [f, setFname] = useState(fname);
const [l, setLname] = useState(lname);
const [a, setAge] = useState(age);
const [i] = useState(id)
    
const PEOPLE = "/api/people";

// Submits editing row
const handleSubmit= ( i:string, f:string, l:string, a:number, e:Function)=>{
fetch(PEOPLE
,{
    method: 'POST',
    headers: {
        type: 'UPDATE',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify( {
    ID: i,
    FNAME: f,
    LNAME: l,
    AGE: a
    })
})
.then(function(response){
console.log(response);
setIsEditing(false);
})
.then(()=>{
e();
});
}


return(<tr>
    <td>{ isEditing ? <input value={f} onChange={ e => setFname(e.target.value) } /> : f}</td>
    <td>{ isEditing ? <input value={l} onChange={ e => setLname(e.target.value) } /> : l}</td>
    <td>{ isEditing ? <input value={a} onChange={ e => setAge(parseInt(e.target.value) || a)} /> : a}</td>
    <td>{ isEditing ? <button onClick={() => handleSubmit(i,f,l,a,edit)}>Done</button> : <button className='Editbutton' onClick={() => setIsEditing(true)}>Edit</button>}</td>
    <td>{remove}</td>
</tr>)
};

export const Header = ({fSort, lSort,aSort}: headerProps) =>
<tr>
    <th>First name {fSort}</th>
    <th>Last name {lSort}</th>
    <th>Age {aSort}</th>
    <th>{}</th>
    <th>{}</th>
</tr>
;
