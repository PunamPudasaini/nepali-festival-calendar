import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AddFestivalDialog } from "./AddFestivalDialog";
import { useIsMobile } from "@/hooks/use-mobile";
import NepaliDate from "nepali-date-converter";
import { PlusIcon } from "lucide-react";

interface DayCellProps {
  day: string;
  date: string;
  festivals: Array<{ id: string; name: string }>;
  onFestivalClick: (festivalId: string) => void;
  onAddClick: () => void;
  disabled?: boolean;
}

export const DayCell = ({
  day,
  date,
  festivals,
  onFestivalClick,
  disabled = false,
}: DayCellProps) => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const isMobile = useIsMobile();

  const getEnglishDate = (nepaliDate: string) => {
    if (!nepaliDate || disabled) return "";
    const [year, month, day] = nepaliDate.split("-").map(Number);
    const nDate = new NepaliDate(year, month - 1, day);
    const eDate = nDate.toJsDate();
    return eDate.getDate();
  };

  const handleAddClick = () => {
    onFestivalClick(festivals[0]?.id);
  };

  const englishDay = getEnglishDate(date);

  return (
    <div
      className={`
       min-h-[20px] sm:min-h-[100px] items-center flex flex-col justify-center border p-1 sm:p-2 relative flex-grow
       ${disabled ? "bg-gray-50" : "hover:bg-gray-50 transition-colors"}
      `}
      onClick={isMobile ? handleAddClick : undefined}
    >
      <div className="flex flex-col items-center gap-0.5">
        <span
          className={`
          text-xs sm:text-sm font-medium 
          ${
            disabled
              ? "text-gray-400"
              : festivals.length > 0
              ? "text-destructive-100"
              : ""
          }
        `}
        >
          {day}
        </span>
        {!disabled && (
          <span className="text-[10px] sm:text-xs text-gray-500">
            {englishDay}
          </span>
        )}
      </div>

      {!disabled && (
        <>
          {festivals.length > 0 ? (
            <div>
              {!isMobile &&
                festivals.map((festival) => (
                  <Button
                    key={festival.id}
                    variant="ghost"
                    className="w-full text-left text-[10px] lg:text-xs xl:text-sm  text-destructive-100 hover:text-primary-100 text-ellipsis overflow-hidden line-clamp-2"
                    onClick={() => onFestivalClick(festival.id)}
                  >
                    {festival.name}
                  </Button>
                ))}
              {isMobile && (
                <div
                  className="w-full h-full inset-0 cursor-pointer"
                  onClick={() => {
                    console.log("clicked");
                    onFestivalClick(festivals[0]?.id);
                  }}
                />
              )}
            </div>
          ) : (
            !isMobile && (
              <Button
                variant="ghost"
                size="icon"
                className="opacity-0 hover:opacity-100 transition-opacity absolute bottom-2 right-2"
                onClick={handleAddClick}
              >
                <PlusIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              </Button>
            )
          )}

          <AddFestivalDialog
            isOpen={isAddDialogOpen}
            onClose={() => setIsAddDialogOpen(false)}
            defaultDate={date}
          />
        </>
      )}
    </div>
  );
};
