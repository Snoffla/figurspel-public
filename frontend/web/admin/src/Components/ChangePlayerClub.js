import React, { useState, useEffect } from "react";
import {
  getPlayerByEmail,
  updatePlayerClub,
} from "../utilities/server/players";
import { useInput } from "../utilities/useInput";

import ClubPicker from "./ClubPicker";

function ChangePlayerClub(props) {
  const {
    value: email,
    bind: bindEmail,
    reset: resetEmail,
    setValue: setEmail,
  } = useInput("");

  const [saving, setSaving] = useState(false);
  const [clubId, setClubId] = useState(null);
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);

    getPlayerByEmail(email)
      .then((player) => {
        if (player.id) {
          updatePlayerClub(player.id, clubId)
            .then((res) => {
              setMessage("Användarens klubb har sparats");
              setSaving(false);
            })
            .catch((e) => {
              setMessage("Något gick fel");
              setSaving(false);
            });
        } else {
          setMessage("Spelaren hittades inte");
          setSaving(false);
        }
      })
      .catch((e) => {
        setMessage("Spelaren hittades inte");
        setSaving(false);
      });
  }

  return (
    <div className="m-3 p-3 shadow rounded card">
      <form onSubmit={handleSubmit}>
        <p className="h5">Byt klubb för spelare</p>
        <div className="mb-3">
          <label htmlFor="emailInput" className="form-label">
            Spelarens e-post
          </label>
          <input
            type="text"
            className="form-control"
            id="emailInput"
            {...bindEmail}
          />
        </div>

        <span className="mb-1">Ny klubb</span>
        <ClubPicker
          onChange={(e) => {
            setClubId(e);
          }}
          defaultValue={{ label: "Välj klubb", value: "" }}
        />
        <p>{message}</p>
        {saving ? (
          <span className="text-muted">Sparar...</span>
        ) : (
          <button type="submit" className="btn btn-primary d-block">
            Spara
          </button>
        )}
      </form>
    </div>
  );
}

export default ChangePlayerClub;
