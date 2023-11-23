import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [countriesList, setCountriesList] = useState([]);

  useEffect(() => {
    axios
      .get(" https://ih-countries-api.herokuapp.com/countries")
      .then((response) => {
        // console.log(response.data[0]);
        setCountriesList(response.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  if (isLoading) {
    return <h3>Loading...</h3>;
  }
  return (
    <div style={{ border: "solid", margin: 50 }}>
      <h4>WikiCountries: Your Guide to the World</h4>
      <hr />

      {countriesList.map((each) => (
        <div key={each.alpha3Code}>
          <Link to={`/countries/${each.alpha3Code}`}>
            <img
              src={`https://flagpedia.net/data/flags/icon/72x54/${each.alpha2Code.toLowerCase()}.png`}
              alt="flag"
            />
            <br />
            <p>{each.name.official}</p>
          </Link>
          <hr />
        </div>
      ))}
    </div>
  );
}
