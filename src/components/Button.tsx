"use client";

import { fetchBeers } from "@/actions";
import { useState } from "react";

export const Button = () => {
  const [beers, setBeers] = useState();

  const handleBeer = async () => {
    const beers = await fetchBeers();
    setBeers(beers);
  };

  return (
    <>
      <button
        onClick={() => {
          handleBeer();
        }}
      >
        Fetch beers
      </button>
      <pre>{Boolean(beers) && JSON.stringify({ beers })}</pre>
    </>
  );
};
