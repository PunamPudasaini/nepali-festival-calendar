import React from "react";
import { List, Calendar } from "lucide-react";
import "./index.css";
import { useFestival } from "../../context/FestivalContext";

export const ViewToggle: React.FC = () => {
  const { viewMode, setViewMode } = useFestival();

  return (
    <div className="view-toggle">
      <button
        className={`toggle-btn ${viewMode === "list" ? "active" : ""}`}
        onClick={() => setViewMode("list")}
      >
        <List size={20} />
        All Festivals
      </button>
      <button
        className={`toggle-btn ${viewMode === "calendar" ? "active" : ""}`}
        onClick={() => setViewMode("calendar")}
      >
        <Calendar size={20} /> Calendar
      </button>
    </div>
  );
};
