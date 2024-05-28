"use server";

export const fetchBeers = () => {
  const response = fetch("https://api.openbrewerydb.org/v1/breweries").then(
    (response) => response.json()
  );

  return response;
};
