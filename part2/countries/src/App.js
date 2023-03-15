import { useState, useEffect } from "react";
import axios from "axios";
import Country from "./components/Country";
import Notification from "./components/Notification";
import "./index.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [newSearch, setNewSearch] = useState("");
  const [countryStyle, setCountryStyle] = useState("");
  const [message, setMessage] = useState(null);
  const [statusOne, setStatusOne] = useState(false);
  const [statusTwo, setStatusTwo] = useState(false);
  const [isShown, setShow] = useState(false);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const filterQuery = (e) => {
    setNewSearch(e.target.value);
    let regexp = new RegExp(`^${newSearch}`, "gi");
    setCountries(
      countries.filter((country) => country.name.common.match(regexp))
    );
    if (countries.length > 10) {
      setMessage("Too many matches, specify another filter");
      setCountryStyle("hidder");
    } else if (countries.length <= 10 && countries.length > 1) {
      setMessage("");
      setCountryStyle("makevisible");
      setStatusTwo(true);
    } else if (countries.length === 1) setStatusOne(true);
  };

  const showView = () => {
    setShow((current) => !current);
  };

  return (
    <div>
      <div>
        filter
        <input value={newSearch} onChange={filterQuery} />
      </div>
      <Notification message={message} />
      <div className={countryStyle}>
        {countries.map((country, i) => (
          <Country
            key={i}
            country={country}
            statusOne={statusOne}
            statusTwo={statusTwo}
            showView={showView}
            isShown={isShown}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
