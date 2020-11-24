import React, { useState } from "react";
import "./App.css";
import BusinessList from "./components/BusinessList/BusinessList";
import SearchBar from "./components/SearchBar/SearchBar";
import Yelp from "./util/Yelp";

const App = () => {
  const [businesses, setBusinesses] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  const searchYelp = async (term, location, sortBy) => {
    setisLoading(true);
    const result = await Yelp.search(term, location, sortBy);
    setBusinesses(result);
    setisLoading(false);
  };

  return (
    <div className="App">
      <h1>look-up</h1>
      <SearchBar searchYelp={searchYelp} isLoading={isLoading} />
      <BusinessList businesses={businesses} />
    </div>
  );
};

export default App;
