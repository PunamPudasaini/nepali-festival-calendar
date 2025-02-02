import { useState, useEffect } from "react";
import { CalendarHeader } from "./CalendarHeader";
import { DayCell } from "./DayCell";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useFestivalStore } from "@/store/festivalStore";
import NepaliDate from "nepali-date-converter";
import {
  calendarData,
  getBsMonthDays,
  toNepaliDigits,
} from "@/lib/nepaliCalendarData";
import { AddFestivalDialog } from "./AddFestivalDialog";

export const NepaliCalendar = () => {
  const { selectedDate, festivals, setSelectedDate, updateNotes } =
    useFestivalStore();
  const [calendar, setCalendar] = useState<
    Array<Array<{ day: number; isCurrentMonth: boolean }>>
  >([]);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [notes, setNotes] = useState<{ [key: string]: string }>({});
  const hasFestival = festivals.some((f) => f.date === selectedDay);

  useEffect(() => {
    const generateCalendar = () => {
      const firstDay = new NepaliDate(
        selectedDate.getYear(),
        selectedDate.getMonth(),
        1
      );
      const startingDay = firstDay.getDay();
      const daysInMonth = getBsMonthDays(
        selectedDate.getYear(),
        selectedDate.getMonth() + 1
      );

      const prevMonth =
        selectedDate.getMonth() === 0 ? 11 : selectedDate.getMonth() - 1;
      const prevYear =
        selectedDate.getMonth() === 0
          ? selectedDate.getYear() - 1
          : selectedDate.getYear();
      const daysInPrevMonth = getBsMonthDays(prevYear, prevMonth + 1);

      const weeks: Array<Array<{ day: number; isCurrentMonth: boolean }>> = [];
      let week: Array<{ day: number; isCurrentMonth: boolean }> = [];

      for (let i = 0; i < startingDay; i++) {
        week.push({
          day: daysInPrevMonth - startingDay + i + 1,
          isCurrentMonth: false,
        });
      }

      for (let day = 1; day <= daysInMonth; day++) {
        week.push({ day, isCurrentMonth: true });
        if (week.length === 7) {
          weeks.push(week);
          week = [];
        }
      }

      if (week.length > 0) {
        let nextMonthDay = 1;
        while (week.length < 7) {
          week.push({
            day: nextMonthDay++,
            isCurrentMonth: false,
          });
        }
        weeks.push(week);
      }

      setCalendar(weeks);
    };

    generateCalendar();
  }, [selectedDate]);

  const handlePrevMonth = () => {
    const newDate = new NepaliDate(
      selectedDate.getYear(),
      selectedDate.getMonth() - 1,
      1
    );
    setSelectedDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new NepaliDate(
      selectedDate.getYear(),
      selectedDate.getMonth() + 1,
      1
    );
    setSelectedDate(newDate);
  };

  const handleMonthChange = (month: number) => {
    const newDate = new NepaliDate(selectedDate.getYear(), month, 1);
    setSelectedDate(newDate);
  };

  const handleYearChange = (year: number) => {
    const newDate = new NepaliDate(year, selectedDate.getMonth(), 1);
    setSelectedDate(newDate);
  };

  const getFestivalsForDate = (day: number) => {
    const dateString = `${selectedDate.getYear()}-${String(
      selectedDate.getMonth() + 1
    ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return festivals.filter((f) => f.date === dateString);
  };

  const handleNoteChange = (festivalId: string, note: string) => {
    setNotes((prevNotes) => ({ ...prevNotes, [festivalId]: note }));
    updateNotes(festivalId, note);
  };

  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden">
      <CalendarHeader
        currentDate={selectedDate}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
        onMonthChange={handleMonthChange}
        onYearChange={handleYearChange}
      />

      <div className="grid grid-cols-7 bg-gray-100">
        {calendarData.bsDays.map((day) => (
          <div
            key={day}
            className="p-1 sm:p-2 text-center font-semibold text-xs sm:text-sm"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {calendar.map((week, weekIndex) =>
          week.map(({ day, isCurrentMonth }, dayIndex) => (
            <DayCell
              key={`${weekIndex}-${dayIndex}`}
              day={toNepaliDigits(day)}
              date={
                isCurrentMonth
                  ? `${selectedDate.getYear()}-${String(
                      selectedDate.getMonth() + 1
                    ).padStart(2, "0")}-${String(day).padStart(2, "0")}`
                  : ""
              }
              festivals={isCurrentMonth ? getFestivalsForDate(day) : []}
              onFestivalClick={(_id) =>
                setSelectedDay(
                  `${selectedDate.getYear()}-${String(
                    selectedDate.getMonth() + 1
                  ).padStart(2, "0")}-${String(day).padStart(2, "0")}`
                )
              }
              onAddClick={() => console.log("Add clicked")}
              disabled={!isCurrentMonth}
            />
          ))
        )}
      </div>

      {selectedDay &&
        (hasFestival ? (
          <Dialog
            open={!!selectedDay}
            onOpenChange={() => setSelectedDay(null)}
          >
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Festival Details - {selectedDay}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                {festivals
                  .filter((f) => f.date === selectedDay)
                  .map((festival) => (
                    <div key={festival.id} className="p-4 border rounded-lg">
                      <h3 className="font-bold text-lg text-destructive-100">
                        {festival.name}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {festival.description}
                      </p>
                      <Textarea
                        placeholder="Add your notes..."
                        className="min-h-[100px] mt-2"
                        value={notes[festival.id] || festival.notes || ""}
                        onChange={(e) =>
                          handleNoteChange(festival.id, e.target.value)
                        }
                      />
                    </div>
                  ))}
              </div>
            </DialogContent>
          </Dialog>
        ) : (
          <AddFestivalDialog
            isOpen={!!selectedDay}
            onClose={() => setSelectedDay(null)}
            defaultDate={selectedDay}
          />
        ))}
    </div>
  );
};
