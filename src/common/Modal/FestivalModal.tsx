import { X } from "lucide-react";
import "./index.css";

export const FestivalModal = ({
  form,
  onChangeForm,
  onSave,
  onClose,
  selectedDay,
  editingFestival,
}: {
  form: any;
  onChangeForm: (form: any) => void;
  onSave: () => void;
  onClose: () => void;
  selectedDay: { date: number; month: number } | null;
  editingFestival: { oldDate: string; oldName: string } | null;
}) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>
            {editingFestival
              ? "Edit Festival"
              : `Add Festival${selectedDay ? ` for ${selectedDay.date}` : ""}`}
          </h3>
          <button className="modal-close" onClick={onClose}>
            <X />
          </button>
        </div>
        <div className="modal-body">
          {!selectedDay && !editingFestival && (
            <div className="form-group">
              <label>Date (MM-DD)</label>
              <input
                type="text"
                value={form.date || ""}
                onChange={(e) =>
                  onChangeForm({ ...form, date: e.target.value })
                }
                placeholder="Enter date (e.g., 01-15)"
                pattern="\d{2}-\d{2}"
              />
            </div>
          )}
          <div className="form-group">
            <label>Festival Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => onChangeForm({ ...form, name: e.target.value })}
              placeholder="Enter festival name"
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={form.description}
              onChange={(e) =>
                onChangeForm({ ...form, description: e.target.value })
              }
              placeholder="Enter festival description"
              rows={3}
            />
          </div>
          <div className="checkbox-group">
            <input
              type="checkbox"
              id="isHoliday"
              checked={form.isHoliday}
              onChange={(e) =>
                onChangeForm({ ...form, isHoliday: e.target.checked })
              }
            />
            <label htmlFor="isHoliday">Is this a public holiday?</label>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={onSave}>
            {editingFestival ? "Update Festival" : "Add Festival"}
          </button>
        </div>
      </div>
    </div>
  );
};
