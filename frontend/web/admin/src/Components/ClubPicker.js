import React, { useState, useEffect } from "react";

import Select from "react-select";
import { getAllClubs } from "../utilities/server/clubs";

export default function ClubPicker({
  onChange = () => {},
  style,
  defaultValue = { label: "Alla", value: "" },
}) {
  const [clubs, setClubs] = useState([]);

  const [items, setItems] = useState([]);

  useEffect(() => {
    getAllClubs()
      .then((clubs) => {
        setClubs(clubs);
        setItems(clubsToItems(clubs, defaultValue));
      })
      .catch((err) => {});
  }, []);

  const styles = {
    container: (provided) => ({
      ...provided,
      ...style,
    }),
  };

  return (
    <Select
      className="mb-4"
      styles={styles}
      options={items}
      isClearable={false}
      isSearchable={true}
      defaultValue={defaultValue}
      onChange={(e) => {
        onChange(e.value);
      }}
    />
  );
}

function clubsToItems(clubs, defaultValue) {
  var items = [defaultValue];
  clubs.forEach((club) => {
    items.push({ label: club.name, value: club.id });
  });
  return items;
}
