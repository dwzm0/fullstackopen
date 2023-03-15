import Weather from "./Weather";

const CountryView = ({ country }) => {
  return (
    <div key={country.name.common}>
      <h1>{country.name.common}</h1>
      <p>capital: {country.capital}</p>
      <p>area: {country.area}</p>
      <h2>Languages: </h2>
      {
        <ul>
          {Object.values(country.languages).map((value) => (
            <li>{value}</li>
          ))}
        </ul>
      }
      <div>
        <img src={country.flags.png} alt={country.flags.alt} />
      </div>
      <Weather country={country} />
    </div>
  );
};

export default CountryView;
