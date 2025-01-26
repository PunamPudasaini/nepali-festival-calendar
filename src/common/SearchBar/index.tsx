import React from "react";
import "./index.css";
import { useFestival } from "../../context/FestivalContext";
import { Search } from "lucide-react";

export const SearchBar: React.FC = () => {
  const { searchQuery, setSearchQuery } = useFestival();

  return (
    <div className="search-container">
      <Search className="search-icon" />
      <input
        type="text"
        placeholder="Search festivals..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />
    </div>
  );
};
