import React from "react";

const CountryList = ({countries}) => {
    return(<><h2>Countries</h2>
        <ul>
            {countries.map(country =>
                <li key={country.name}> {country.name} </li>
            )}
        </ul>
    </>)
}

export default CountryList
