import React from "react";

const CountryDetailed = ({country}) => {
    console.log(country)
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
        </>
    )
}

export default CountryDetailed
