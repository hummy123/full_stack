import React, {useEffect, useState} from "react";
import axios from "axios";

const CountryDetailed = ({country}) => {
    const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
    const weatherAPI = `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${country.capital}`

    const [weather, setWeather] = useState('')

    useEffect(() => {
        axios.get(weatherAPI)
            .then(response => {
                setWeather(response.data.current)
            })
    }, [weatherAPI])


    return(
        <>
            <h2>{country.name}</h2>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>

            <h2>Languages</h2>
            <ul>
                {country.languages.map(language =>
                    <li key={language.name}> {language.name} </li>
                )}
            </ul>
            <img src={country.flag} alt={`The flag of ${country.name}`} />
            <h2>Weather in {country.capital}</h2>
            <img
                src={weather.weather_icons}
                alt={`The weather in ${country.capital} is ${weather.weather_descriptions}`}
            />
            <p>{weather.weather_descriptions}</p>
            <p>Temperature: {weather.temperature}</p>
        </>
    )
}

export default CountryDetailed
