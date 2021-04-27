import React, { useEffect, useState } from "react";
import { FormControl, MenuItem, Select } from "@material-ui/core";
import "./App.css";

// https://disease.sh/v3/covid-19/countries

function App() {
  const [countries, setcountries] = useState([]);

  useEffect(() => {
    const getCountriesData = async() => {
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) =>{
        const countries = data.map((country) => ({
          name : country.country,
          value : country.countryInfo.iso2,
        }));
        setcountries(countries);
      })
    }
    getCountriesData();
  }, []);

  return (
    <div className="app">
      <div className="app__header">
        <div>
          <h1>Covid Tracker</h1>
          <h6>a initiave by cwm</h6>
        </div>
        <FormControl className="app__dropdown">
          <Select variant="outlined" value="abc">
            {countries.map((country) => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

export default App;
