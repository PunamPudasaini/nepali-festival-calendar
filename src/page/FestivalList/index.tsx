import React from "react";
import "./index.css";
import { useFestivalContext } from "../../context/FestivalContext";
import { Festival } from "../../type/festival";

interface FestivalListProps {
  onEdit: (festival: Festival) => void;
}

export const FestivalListView: React.FC<FestivalListProps> = ({ onEdit }) => {
  const { state, dispatch } = useFestivalContext();

  const filteredFestivals = state.festivals.filter((festival) => {
    const matchesSearch = festival.name
      .toLowerCase()
      .includes(state?.searchQuery.toLowerCase());

    if (!state.selectedDate) {
      return matchesSearch;
    }

    const festivalDate = new Date(festival.date);
    const filterDate = new Date(state.selectedDate);

    return (
      matchesSearch &&
      festivalDate.getDate() === filterDate.getDate() &&
      festivalDate.getMonth() === filterDate.getMonth() &&
      festivalDate.getFullYear() === filterDate.getFullYear()
    );
  });

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this festival?")) {
      dispatch({ type: "DELETE_FESTIVAL", payload: id });
    }
  };

  const handleNotesChange = (id: string, notes: string) => {
    dispatch({ type: "UPDATE_NOTES", payload: { id, notes } });
  };

  return (
    <div className="festival-list-view">
      {filteredFestivals.map((festival) => (
        <div key={festival.id} className="festival-card">
          <div className="festival-header">
            <h3>{festival.name}</h3>
            <div className="festival-actions">
              <button onClick={() => onEdit(festival)} className="btn-edit">
                Edit
              </button>
              <button
                onClick={() => handleDelete(festival.id)}
                className="btn-delete"
              >
                Delete
              </button>
            </div>
          </div>
          <p className="festival-date">
            {new Date(festival.date).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p className="festival-description">{festival.description}</p>
          <div className="festival-notes">
            <textarea
              placeholder="Add personal notes..."
              value={festival.notes || ""}
              onChange={(e) => handleNotesChange(festival.id, e.target.value)}
              className="notes-input"
            />
          </div>
        </div>
      ))}
      {filteredFestivals.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No festivals found for the selected criteria
        </div>
      )}
    </div>
  );
};
