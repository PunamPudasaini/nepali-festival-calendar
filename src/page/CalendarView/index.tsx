import React, { useState } from "react";
import { Plus } from "lucide-react";
import { useFestivalContext } from "../../context/FestivalContext";
import "./index.css";

export const CalendarView = () => {
  const { state, dispatch } = useFestivalContext();
  const [currentDate, setCurrentDate] = useState(() => {
    if (state.selectedDate) {
      return new Date(state.selectedDate);
    }
    return new Date();
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // const monthNames = [
  //   "बैशाख",
  //   "जेठ",
  //   "आषाढ",
  //   "श्रावण",
  //   "भदौ",
  //   "असोज",
  //   "कार्तिक",
  //   "मंसिर",
  //   "पौष",
  //   "माघ",
  //   "फाल्गुन",
  //   "चैत्र",
  // ];

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Generate year options (5 years before and after current year)
  const years = Array.from({ length: 11 }, (_, i) => year - 5 + i);

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const calendar = Array.from({ length: 42 }, (_, i) => {
    const dayIndex = i - firstDayOfMonth + 1;
    return dayIndex > 0 && dayIndex <= daysInMonth ? dayIndex : null;
  });

  const getFestivalsForDay = (day: number | null) => {
    if (!day) return [];
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
    return state.festivals.filter((festival) => festival.date === dateStr);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = parseInt(e.target.value);
    setCurrentDate(new Date(newYear, month));
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = parseInt(e.target.value);
    setCurrentDate(new Date(year, newMonth));
  };

  const handleDateClick = (day: number | null) => {
    if (!day) return;
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
    setSelectedDate(dateStr);
    setShowAddForm(true);
  };

  return (
    <div className="calendar-container">
      <div className="calendar-navigation">
        <div className="year-month-selector">
          <select
            value={year}
            onChange={handleYearChange}
            className="year-select"
            aria-label="Select Year"
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
          <select
            value={month}
            onChange={handleMonthChange}
            className="month-select"
            aria-label="Select Month"
          >
            {monthNames.map((name, index) => (
              <option key={name} value={index}>
                {name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="calendar-grid">
        <div className="calendar-header">
          {/* ["आईत", "सोम", "मंगल", "बुध", "बिही", "शुक्र", "शनि"] */}
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="calendar-day-header">
              {day}
            </div>
          ))}
        </div>

        <div className="calendar-days">
          {calendar.map((day, index) => {
            const dateStr = day
              ? `${year}-${String(month + 1).padStart(2, "0")}-${String(
                  day
                ).padStart(2, "0")}`
              : null;
            const festivals = getFestivalsForDay(day);
            const isSelected = dateStr === selectedDate;

            return (
              <div
                key={index}
                className={`calendar-cell ${!day ? "empty" : ""} ${
                  isSelected ? "selected" : ""
                }`}
                onClick={() => handleDateClick(day)}
              >
                {day && (
                  <>
                    <div className="day-header">
                      <span className="day-number">{day}</span>
                      <div className="festival-list">
                        {festivals.map((festival) => (
                          <div
                            key={festival.id}
                            className="calendar-festival"
                            title={festival.name}
                          >
                            {festival.name}
                          </div>
                        ))}
                      </div>
                      <button
                        className="add-festival-button"
                        title="Add Festival"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {showAddForm && selectedDate && (
        <div className="calendar-modal">
          <div className="modal-content">
            <h3>Add Festival for {selectedDate}</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                dispatch({
                  type: "ADD_FESTIVAL",
                  payload: {
                    id: Date.now().toString(),
                    name: formData.get("name") as string,
                    date: selectedDate,
                    description: formData.get("description") as string,
                  },
                });
                setShowAddForm(false);
              }}
            >
              <div className="form-group">
                <label htmlFor="name">Festival Name</label>
                <input type="text" id="name" name="name" required />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea id="description" name="description" required />
              </div>
              <div className="modal-actions">
                <button type="submit" className="btn-primary">
                  Add Festival
                </button>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setShowAddForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
