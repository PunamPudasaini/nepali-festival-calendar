import { Edit, Plus, Trash2 } from "lucide-react";
import "./index.css";
import { Festival, FestivalState } from "../../context/FestivalContext";

export const FestivalList = ({
  festivals,
  onEdit,
  onDelete,
  onUpdateNote,
  onAddNew,
  state,
}: {
  festivals: Festival[];
  onEdit: (festival: any) => void;
  onDelete: (date: string, name: string) => void;
  onUpdateNote: (date: string, name: string, note: string) => void;
  onAddNew: () => void;
  state: FestivalState;
}) => {
  return (
    <div className="festival-list">
      <div className="add-festival-button">
        <button className="btn btn-primary" onClick={onAddNew}>
          <Plus size={18} /> Add New Festival
        </button>
      </div>
      {festivals.map((festival) => (
        <div
          key={`${festival.date}-${festival.name}`}
          className="festival-card"
        >
          <div className="festival-card-header">
            <h3>{festival.name}</h3>
            <div className="festival-actions">
              <button className="btn-icon" onClick={() => onEdit(festival)}>
                <Edit size={18} />
              </button>
              <button
                className="btn-icon delete"
                onClick={() => onDelete(festival.date, festival.name)}
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
          <div className="date">{festival.date}</div>
          <p className="description">{festival.description}</p>
          {festival.isHoliday && (
            <span className="holiday-badge">Public Holiday</span>
          )}
          <div className="notes">
            <textarea
              placeholder="Add personal notes..."
              value={state.notes[`${festival.date}-${festival.name}`] || ""}
              onChange={(e) =>
                onUpdateNote(festival.date, festival.name, e.target.value)
              }
            />
          </div>
        </div>
      ))}
    </div>
  );
};
