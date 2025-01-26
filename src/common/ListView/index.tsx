import "./index.css";
import { Festival } from "../../type/festival";

interface FestivalProps {
  festivals: Festival[];
  notes: Record<string, string>;
  updateNote: (festivalId: string, note: string) => void;
}

export const ListView = ({ festivals, notes, updateNote }: FestivalProps) => {
  return (
    <div className="list-view">
      {festivals.map((festival) => (
        <div key={festival.id} className="festival-card">
          <h3>{festival.name}</h3>
          <p className="date">
            {new Date(festival.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p className="description">{festival.description}</p>
          <textarea
            placeholder="Add your notes..."
            value={notes[festival.id] || ""}
            onChange={(e) => updateNote(festival.id, e.target.value)}
            className="notes-input"
          />
        </div>
      ))}
    </div>
  );
};
