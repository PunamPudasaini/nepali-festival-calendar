import NepaliDate from "nepali-date-converter";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { calendarData, toNepaliDigits } from "@/lib/nepaliCalendarData";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

interface CalendarHeaderProps {
  currentDate: NepaliDate;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onMonthChange: (month: number) => void;
  onYearChange: (year: number) => void;
}

export const CalendarHeader = ({
  currentDate,
  onPrevMonth,
  onNextMonth,
  onMonthChange,
  onYearChange,
}: CalendarHeaderProps) => {
  const currentYear = currentDate.getYear();
  const currentMonth = currentDate.getMonth();
  const years = Array.from(
    { length: 131 },
    (_, i) => calendarData.minBsYear + i
  );

  return (
    <div className="flex items-center justify-between p-2 sm:p-4 bg-destructive-100 text-white rounded-t-lg flex-wrap">
      <Button
        variant="ghost"
        onClick={onPrevMonth}
        size="icon"
        className="text-white hover:text-destructive-200"
      >
        <ChevronLeftIcon className="h-4 w-4 sm:h-5 sm:w-5" />
      </Button>

      <div className="flex flex-row gap-2 sm:gap-4 flex-wrap">
        <Select
          onValueChange={(value) => onYearChange(parseInt(value))}
          value={currentYear.toString()}
        >
          <SelectTrigger className="w-[80px] sm:w-[120px] bg-transparent border-white text-white">
            <SelectValue placeholder={toNepaliDigits(currentYear)} />
          </SelectTrigger>
          <SelectContent>
            {years.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {toNepaliDigits(year)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          onValueChange={(value) => onMonthChange(parseInt(value))}
          value={currentMonth.toString()}
        >
          <SelectTrigger className="w-[80px] sm:w-[120px] bg-transparent border-white text-white">
            <SelectValue
              placeholder={calendarData.bsMonths[currentDate.getMonth()]}
            />
          </SelectTrigger>
          <SelectContent>
            {calendarData.bsMonths.map((month, index) => (
              <SelectItem key={index} value={index.toString()}>
                {month}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button
        variant="ghost"
        onClick={onNextMonth}
        size="icon"
        className="text-white hover:text-destructive-200"
      >
        <ChevronRightIcon className="h-4 w-4 sm:h-5 sm:w-5" />
      </Button>
    </div>
  );
};
