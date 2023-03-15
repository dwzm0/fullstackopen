import CountryView from "./CountryView";

const Country = ({ country, statusOne, statusTwo, showView, isShown }) => {
  if (statusOne === true) {
    return (
      <>
        <CountryView country={country} />
      </>
    );
  } else if (statusTwo === true) {
    return (
      <>
        <div>
          {country.name.common}
          <button onClick={() => showView()}>show</button>
          {isShown ? <CountryView country={country} /> : null}
        </div>
      </>
    );
  }
  return <p>{country.name.common}</p>;
};
export default Country;
