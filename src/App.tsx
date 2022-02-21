import './App.css';
import {Row, Header} from './components/table';
import {useMemo, useState, useEffect } from "react";


interface Person {
  ID: string;
  FNAME: string;
  LNAME: string;
  AGE: number;
}

function App() {
  const PEOPLE = "/api/people";
  const [people, setPeople] = useState<Person[]>([]);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [age, setAge] = useState(0);
  const [forder, setForder] = useState("asc");
  const [lorder, setLorder] = useState("-");
  const [aorder, setAorder] = useState("-");

  // unique id for person
  const [id, setID] = useState(() => `p-${Math.random().toString(16).slice(2)}`);

  // gets data from api
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
  const handleSubmit = () => {
  setID((() => `p-${Math.random().toString(16).slice(2)}`));
  if (age != null) {
  fetch(PEOPLE
  ,{
    method: 'POST',
    headers: {
        type: 'INSERT',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify( {
    ID : id,
    FNAME : fname,
    LNAME : lname,
    AGE : age
    })
  })
  .then(function(response){
  console.log(response)
  setFname("");
  setLname("");
  setAge(0);
  getData();
  });
  }
  else {
    alert("Age cannot be")
  }
  }

  //post data to server
  const handleRemove = (i:string)=>{
    fetch(PEOPLE
    ,{
      method: 'POST',
      headers: {
          type: 'DELETE',
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify( {
      ID: i
      })
    })
    .then(function(response){
    console.log(response);
    getData();
    });
  }

  // Sorts list
  const handleSort = useMemo(() => {
    let p = people;
    if (forder === "asc") {
      p = p.slice().sort((a,b) =>{
        if(a.FNAME > b.FNAME) {
          return 1;
        }
        else {
          return -1;
        }
      });
    }
    else if (forder === "desc") {
      p = p.slice().sort((a,b) =>{
        if(a.FNAME > b.FNAME) {
          return -1;
        }
        else {
          return 1;
        }
      });
    }

    if (lorder === "asc") {
      p = p.slice().sort((a,b) =>{
        if(a.LNAME > b.LNAME) {
          return 1;
        }
        else {
          return -1;
        }
      });
    }
    else if (lorder === "desc") {
      p = p.slice().sort((a,b) =>{
        if(a.LNAME > b.LNAME) {
          return -1;
        }
        else {
          return 1;
        }
      });
    }

    if (aorder === "asc") {
      p = p.slice().sort((a,b) =>{
        if(a.AGE > b.AGE) {
          return 1;
        }
        else {
          return -1;
        }
      });
    }
    else if (aorder === "desc") {
      p = p.slice().sort((a,b) =>{
        if(a.AGE > b.AGE) {
          return -1;
        }
        else {
          return 1;
        }
      });
    }
    console.log(p);
    return p;
  }, [people, forder, lorder, aorder])
  

  // Changes order buttons
  const handleOrderChange = (by:string, order:string) => {
    if (by === "fname") {
      if( order === "-"){
        setForder("asc");
      }
      else if (order === "asc") {
        setForder("desc");
      }
      else if (order === "desc") {
        setForder("-")
      }
    }
    else if (by === "lname" ) {
      if( order === "-"){
        setLorder("asc");
      }
      else if (order === "asc") {
        setLorder("desc");
      }
      else if (order === "desc") {
        setLorder("-")
      }
    }
    else {
      if( order === "-"){
        setAorder("asc");
      }
      else if (order === "asc") {
        setAorder("desc");
      }
      else if (order === "desc") {
        setAorder("-")
      }
    }
  }

  return (
    <div className='App'>
    <table className='App-table'>
    <thead>
    <Header fSort={<button onClick={() => handleOrderChange("fname", forder)}>{forder === "asc" ? <span>▲</span> : forder === "desc" ? <span>▼</span> : <span>-</span>}</button>} lSort={<button onClick={() => handleOrderChange("lname", lorder)} >{lorder === "asc" ? <span>▲</span> : lorder === "desc" ? <span>▼</span>: <span>-</span>}</button>} aSort={<button onClick={() => handleOrderChange("age", aorder)} >{aorder === "asc" ? <span>▲</span> : aorder === "desc" ? <span>▼</span> : <span>-</span>}</button>} />
    </thead>
    <tbody>
    {handleSort.map((person) => {
    return(<Row edit={getData} key={person.ID} id={person.ID} fname={person.FNAME} lname={person.LNAME} age={person.AGE} remove={<button className='Deletebutton' onClick={() => handleRemove(person.ID)}>Delete</button>}/>)
    })}
    </tbody>
    <tfoot>
      <tr>
        <td>
          <label>
          First name:
          <input type="text" value={fname} onChange={e => setFname(e.target.value)} />
          </label>
        </td>
        <td>
          <label>
            Last name:
            <input type="text" value={lname} onChange={e => setLname(e.target.value)} />
          </label>
        </td>
        <td>
          <label>
            Age:
            <input min={0} type="number" value={age} onChange={e => setAge(parseInt(e.target.value)|| age)} />
          </label>
        </td>
      </tr>
    </tfoot>
    </table>
    <button className='Addbutton' onClick={() => handleSubmit()}>Add</button>
    </div>
  );
}

export default App;
