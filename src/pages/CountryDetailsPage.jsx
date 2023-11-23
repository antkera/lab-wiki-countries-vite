import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function CountryDetailsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [countryDetails, setCountryDetails] = useState([]);
  const { countryId } = useParams();

  useEffect(() => {
    axios
      .get(` https://ih-countries-api.herokuapp.com/countries/${countryId}`)
      .then((response) => {
        setCountryDetails(response.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [countryDetails]);
  if (isLoading) {
    return <h3>Loading...</h3>;
  }
  console.log(countryDetails.capital);
  return (
    <div style={{ border: "solid", margin: 50 }}>
      <h2>Country Details</h2>

      <hr />

      <div key={countryDetails.alpha3Code}>
        <img
          src={`https://flagpedia.net/data/flags/icon/72x54/${countryDetails.alpha2Code.toLowerCase()}.png`}
          alt="flag"
        />
        <br />
        <p>{countryDetails.name.official}</p>

        <hr />
        <strong>Capital:</strong>
        {countryDetails.capital.map((each) => {
          return (
            <div>
              <br />
              <p>{each}</p>
            </div>
          );
        })}
        <hr />
        <strong>Area:</strong>
        <br />
        <p>{countryDetails.area}</p>
        <hr />
        <strong>borders:</strong>
        {countryDetails.borders.map((each) => {
          return (
            <div>
              <br />
              <Link to={`/countries/${each}`}>
                {" "}
                <p>{each}</p>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
