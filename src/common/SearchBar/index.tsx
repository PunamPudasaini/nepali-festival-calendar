import React from "react";
import "./index.css";
import { useFestival } from "../../context/FestivalContext";

export const SearchBar: React.FC = () => {
  const { state, dispatch } = useFestival();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SET_SEARCH", payload: e.target.value });
  };

  return (
    <>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search festivals..."
          value={state.searchTerm}
          onChange={handleSearch}
        />
      </div>
    </>
  );
};
