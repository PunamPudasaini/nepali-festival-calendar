import React, { useState } from "react";
import {
  FestivalProvider,
  useFestivalContext,
} from "./context/FestivalContext";
import { SearchBar } from "./common/SearchBar";
import { ViewToggle } from "./common/Toggle";
import { FestivalList } from "./pages/FestivalList";
import { FestivalForm } from "./common/Modal/FestivalModal";
import { X } from "lucide-react";
import { NepaliCalendar } from "./pages/Calendar";

const FestivalCalendar: React.FC = () => {
  const { state } = useFestivalContext();
  const [showForm, setShowForm] = useState(false);
  const [editFestival, setEditFestival] = useState(undefined);
  const { dispatch } = useFestivalContext();

  const handleEdit = (festival: any) => {
    setEditFestival(festival);
    setShowForm(true);
  };

  const clearDateFilter = () => {
    dispatch({ type: "SET_SELECTED_DATE", payload: "" });
  };

  return (
    <>
      <div className="app-container">
        <header className="header">
          <h1>Nepali Festival Calendar</h1>
        </header>

        <div className="btn-container">
          <ViewToggle />
          <button
            onClick={() => {
              setEditFestival(undefined);
              setShowForm(true);
            }}
            className="festival-button"
          >
            Add Festival
          </button>
        </div>
        <div className="headers">
          <SearchBar />
          <div className="date-filter-container">
            <input
              type="date"
              value={state.selectedDate}
              onChange={(e) =>
                dispatch({ type: "SET_SELECTED_DATE", payload: e.target.value })
              }
              className="date-input"
            />
            {state.selectedDate && (
              <button onClick={clearDateFilter} className="clear-date-button">
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {state?.view === "list" ? (
          <FestivalList onEdit={handleEdit} />
        ) : (
          <NepaliCalendar />
        )}

        {showForm && (
          <div className="modal-overlay">
            <FestivalForm
              onClose={() => {
                setShowForm(false);
                setEditFestival(undefined);
              }}
              editFestival={editFestival}
            />
          </div>
        )}
      </div>
    </>
  );
};

function App() {
  return (
    <FestivalProvider>
      <FestivalCalendar />
    </FestivalProvider>
  );
}

export default App;
