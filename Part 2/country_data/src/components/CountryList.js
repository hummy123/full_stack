import React, {useState} from "react";
import CountryDetailed from "./CountryDetailed";

const CountryList = ({countries}) => {

    const showDetail = (country) => <CountryDetailed country={country} />

    const showList = () => {
        return(
            <>
                <h2>Countries</h2>
                <ul>
                    {countries.map(country =>
                        <li key={country.name}>
                            {country.name}
                            <button
                                onClick={() => setDisplay(showDetail(country))}>
                                Show
                            </button>
                        </li>
                    )}
                </ul>
            </>
        )
    }

    const [display, setDisplay] = useState(showList)

    return(display)
}

export default CountryList
