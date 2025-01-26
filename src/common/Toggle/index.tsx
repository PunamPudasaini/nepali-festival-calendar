import React from "react";
import { List, Grid } from "lucide-react";
import "./index.css";
import { useFestival } from "../../context/FestivalContext";

export const ViewToggle: React.FC = () => {
  const { state, dispatch } = useFestival();

  const toggleView = (view: "calendar" | "list") => {
    dispatch({ type: "SET_VIEW", payload: view });
  };

  return (
    <>
      <div className="view-toggle">
        <button
          className={state.view === "calendar" ? "active" : ""}
          onClick={() => toggleView("calendar")}
        >
          <Grid size={18} />
          Calendar
        </button>
        <button
          className={state.view === "list" ? "active" : ""}
          onClick={() => toggleView("list")}
        >
          <List size={18} />
          List
        </button>
      </div>
      {/* </div> */}
    </>
    // <div className="view-toggle">
    //   <button
    //     className={`toggle-btn ${viewMode === "list" ? "active" : ""}`}
    //     onClick={() => setViewMode("list")}
    //   >
    //     <List size={20} />
    //     All Festivals
    //   </button>
    //   <button
    //     className={`toggle-btn ${viewMode === "calendar" ? "active" : ""}`}
    //     onClick={() => setViewMode("calendar")}
    //   >
    //     <Calendar size={20} /> Calendar
    //   </button>
    // </div>
  );
};
