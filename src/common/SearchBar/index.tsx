import React from "react";
import "./index.css";
import { useFestivalContext } from "../../context/FestivalContext";

export const SearchBar: React.FC = () => {
  const { state, dispatch } = useFestivalContext();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SET_SEARCH", payload: e.target.value });
  };

  return (
    <>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search festivals..."
          value={state.searchQuery}
          onChange={(e) => handleSearch(e)}
        />
      </div>
    </>
  );
};
