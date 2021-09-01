import {useEffect, useState} from "react";
import axios from 'axios'
import Filter from "./components/Filter";
import Display from "./components/Display";

function App() {
  const [countries, setCountries] = useState([])
  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all")
        .then(response => {
            setCountries(response.data)
            setFilterCountries(response.data)
        })
  },[])


    const [filteredCountries, setFilterCountries] = useState(countries)
    const filterObject = {
        countries: countries,
        setFilterCountries: setFilterCountries
    }

  return (
    <>
        <h1>Country list</h1>
        <Filter object={filterObject} />
        <Display countries={filteredCountries} />
    </>
  );
}

export default App;
