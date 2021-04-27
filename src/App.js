import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  FormControl,
  MenuItem,
  Select,
} from "@material-ui/core";
import "./App.css";
import InfoBox from "./InfoBox";
import Map from "./Map";
import Table from "./Table";
import {sortData} from "./Util.js";

// https://disease.sh/v3/covid-19/countries

function App() {
  const [countries, setcountries] = useState([]);
  const [country, setcountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));

          const sortedData = sortData(data);

          setTableData(sortedData);
          setcountries(countries);
        });
    };
    getCountriesData();
  }, []);

  useEffect(() => {
    fetch( "https://disease.sh/v3/covid-19/all")
    .then(response => response.json())
    .then(data => {
      setCountryInfo(data);
    })
  }, [])

  const onCountryChange = (event) => {
    const countrycode = event.target.value;

    const url =
      countrycode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countrycode}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
        setcountry(countrycode);
      });
  };

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <div>
            <h1>Covid Tracker</h1>
            <h6>a initiave by cwm</h6>
          </div>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              onChange={onCountryChange}
              value={country}
            >
              <MenuItem value="worldwide">World Wide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          <InfoBox
            title="corona virus cases"
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          ></InfoBox>
          <InfoBox 
          title="Recovered" 
          cases={countryInfo.todayRecovered} 
          total={countryInfo.recovered}>
          </InfoBox>
          <InfoBox 
          title="Deaths" 
          cases={countryInfo.todayDeaths} 
          total={countryInfo.deaths}>
          </InfoBox>
        </div>
        <Map></Map>
      </div>
      <div className="app__right">
        <Card>
          <CardContent>
            <h3>Live Cases By Country</h3>
            <Table countries={tableData}></Table>
            <h3>World Wide new cases</h3>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;
