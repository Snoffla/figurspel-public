import React, { useState, useEffect} from 'react';
import './App.css';

import {getScoreboardData} from './util/server/scoreboard'

const queryParams = new URLSearchParams(window.location.search);


function App() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [title] = useState(queryParams.get('title'));

  const [labels, setLabels] = useState([]);


  const [settings] = useState({
    eventId: queryParams.get('event_id'),
    type: queryParams.get('type'),
    gameType: queryParams.get('game_type'),
    count: parseInt(queryParams.get('count')),
    offset: parseInt(queryParams.get('offset')),
    class: queryParams.get('class')
  });

  useEffect(() => {
    getScoreboardData(settings)
    .then((data) => {
      setRows(data.rows);
      setLabels(data.labels);
      setLoading(false);
    })
    .catch(err => {
      setError(err);
      setLoading(false);
    })
  }, [settings])

  return (
    <div className="App">
      <main className='flex align-items-center justify-content-center flex-column px-3'>
        <h3 className='text-center'>{title}</h3>

        {/*  MAIN TABLE */}
        {(!loading && !error && rows.length > 0) &&
          <table className="table" style={{margin: 0}}>
            <thead>
              <tr>
                <th scope="col"></th>
                {labels.map((value, i) => {
                  return <th scope="col" key={i}>{value}</th>
                })}
              </tr>
            </thead>
            <tbody>

              {rows.map((row, i) => {
                return (
                  <tr key={i}>
                    <th scope="row">{i+1}</th>
                    {Object.values(row).map((value, j) => {
                      return <td key={j}>{value}</td>
                    })
                    }
                  </tr>
                )
              })
              }
            </tbody>
          </table>
        }
        {/*  LOADING MESSAGE */}
        {loading &&
          <p>Laddar topplista</p>
        }
        {/*  ERROR MESSAGE */}
        {error &&
          <p>Ett fel uppstod vid inläsning av data</p>
        }
      </main>
    </div>
  );
}

export default App;
