import { useEffect, useState } from "react";
import NepaliDate from "nepali-date-converter";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { calendarData, toNepaliDigits } from "../../lib/nepaliCalendarData";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useFestivalStore } from "../../store/festivalStore";
import { useToast } from "../../hooks/use-toast";

interface AddFestivalDialogProps {
  isOpen: boolean;
  onClose: () => void;
  defaultDate?: string;
}

export const AddFestivalDialog = ({
  isOpen,
  onClose,
  defaultDate,
}: AddFestivalDialogProps) => {
  const [festivalName, setFestivalName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState(() => {
    if (defaultDate) {
      const [year, month, day] = defaultDate.split("-").map(Number);
      return new NepaliDate(year, month - 1, day);
    }
    return new NepaliDate();
  });

  const { addFestival, festivals } = useFestivalStore();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedDate = `${selectedDate.getYear()}-${String(
      selectedDate.getMonth() + 1
    ).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`;

    if (!festivalName || !description || !formattedDate) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    // Check if a festival already exists for the selected date
    const festivalExists = festivals.some(
      (festival) => festival.date === formattedDate
    );

    if (festivalExists) {
      toast({
        title: "Error",
        description: "A festival already exists for this date",
        variant: "destructive",
      });
      return;
    }

    addFestival({
      name: festivalName,
      description,
      date: formattedDate,
    });

    toast({
      title: "Success",
      description: "Festival added successfully",
    });

    setFestivalName("");
    setDescription("");
    onClose();
  };

  const years = Array.from(
    { length: 131 },
    (_, i) => calendarData.minBsYear + i
  );
  const daysInMonth = calendarData.bsMonthUpperDays[selectedDate.getMonth()][0];
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  useEffect(() => {
    if (!isOpen) {
      setFestivalName("");
      setDescription("");
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Festival</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col space-y-4">
            <div className="grid grid-cols-3 gap-2">
              <Select
                value={selectedDate.getYear().toString()}
                onValueChange={(value) => {
                  setSelectedDate(
                    new NepaliDate(
                      parseInt(value),
                      selectedDate.getMonth(),
                      selectedDate.getDate()
                    )
                  );
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Year" />
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
                value={selectedDate.getMonth().toString()}
                onValueChange={(value) => {
                  setSelectedDate(
                    new NepaliDate(
                      selectedDate.getYear(),
                      parseInt(value),
                      selectedDate.getDate()
                    )
                  );
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  {calendarData.bsMonths.map((month, index) => (
                    <SelectItem key={index} value={index.toString()}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={selectedDate.getDate().toString()}
                onValueChange={(value) => {
                  setSelectedDate(
                    new NepaliDate(
                      selectedDate.getYear(),
                      selectedDate.getMonth(),
                      parseInt(value)
                    )
                  );
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Day" />
                </SelectTrigger>
                <SelectContent>
                  {days.map((day) => (
                    <SelectItem key={day} value={day.toString()}>
                      {toNepaliDigits(day)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label
              htmlFor="festivalName"
              className="block text-sm font-medium text-gray-700"
            >
              Festival Name
            </label>
            <Input
              id="festivalName"
              value={festivalName}
              onChange={(e) => setFestivalName(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <Textarea
              id="description"
              value={description || ""}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add Festival</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
