import React, { useState } from "react";
import './App.css'

function App() {
  const [data, setData] = useState([
    {
      name: null,
      date: null,
      wikiLink: null,
      flight: null,
      detail: null
    },
  ]);


  const API_URL = `https://api.spacexdata.com/v4/launches/upcoming`;

  const fetchData = async () => {
    const data = await (await fetch(API_URL)).json();
    setData(
      data.map((inData) => {
        return {
          name: inData.name,
          date: inData.date_local.substring(0,inData.date_local.indexOf("T")),
          wikiLink: inData.links.wikipedia,
          flight: inData.flight_number,
          detail: inData.details
        };
      })
    );
  };

  
  return (
    <div className="App">
      <div className='head' >
        <h1>Upcoming SpaceX Launches</h1>
        <button onClick={fetchData}>Get Upcoming Launches</button>
      </div>

      <ol className='list'>
        {data.map((launch) => (
          <li className='listItem'>
            <span className='field'>Name:</span>  
            <a href={launch.wikiLink}>
              {launch.name == null? ' No Info Available': ' ' + launch.name}
            </a>
              <br></br>
              <span className='field'>Date:</span> {launch.date == null? 'No Info Available' : launch.date}
              <br></br>
              <span className='field'>Flight No.:</span> {launch.flight == null? 'No Info Available' : launch.flight}
              <br></br>
              <span className='field'>Detail:</span> {launch.detail== null? 'No Info Available': launch.detail}

          </li>
        ))}
      </ol>
    </div>
  );
}

export default App;

