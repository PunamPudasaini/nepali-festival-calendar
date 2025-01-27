import React, { useState } from "react";
import "./index.css";
import { useFestivalContext } from "../../context/FestivalContext";

interface FestivalFormProps {
  onClose: () => void;
  editFestival?: {
    id: string;
    name: string;
    date: string;
    description: string;
  };
}

export const FestivalForm: React.FC<FestivalFormProps> = ({
  onClose,
  editFestival,
}) => {
  const { dispatch } = useFestivalContext();
  const [formData, setFormData] = useState({
    name: editFestival?.name || "",
    date: editFestival?.date || "",
    description: editFestival?.description || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editFestival) {
      dispatch({
        type: "UPDATE_FESTIVAL",
        payload: {
          id: editFestival.id,
          ...formData,
        },
      });
    } else {
      dispatch({
        type: "ADD_FESTIVAL",
        payload: {
          id: Date.now().toString(),
          ...formData,
        },
      });
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="festival-form">
      <h2>{editFestival ? "Edit Festival" : "Add New Festival"}</h2>
      <div className="form-group">
        <label htmlFor="name">Festival Name</label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          required
        />
      </div>
      <div className="form-actions">
        <button type="submit" className="btn-primary">
          {editFestival ? "Update" : "Add"} Festival
        </button>
        <button type="button" onClick={onClose} className="btn-secondary">
          Cancel
        </button>
      </div>
    </form>
  );
};
