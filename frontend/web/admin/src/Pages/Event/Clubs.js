import React, { useState, useEffect } from "react";
import ChangePlayerClub from "../../Components/ChangePlayerClub";

import { getClubEventStats } from "../../utilities/server/events";

function Clubs(props) {
  const eventId = props.eventId;

  const [stats, setStats] = useState([]);

  useEffect(() => {
    getClubEventStats(eventId)
      .then((data) => {
        setStats(data);
      })
      .catch(() => {});
  }, []);

  return (
    <div style={{ marginBottom: "200px" }}>
      <div className="m-3 p-3 overflow-scroll shadow rounded card">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Klubb</th>
              <th scope="col">Antal spelade serier</th>
            </tr>
          </thead>
          <tbody className="overflow-scroll">
            {stats.map((club, index) => {
              if (parseInt(club.total) > 0) {
                return (
                  <tr key={club.id}>
                    <td>{club.name}</td>
                    <td>{club.total}</td>
                  </tr>
                );
              } else {
                return;
              }
            })}
          </tbody>
        </table>
      </div>
      <ChangePlayerClub />
    </div>
  );
}

export default Clubs;
