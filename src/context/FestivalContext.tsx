import React, { createContext, useContext, useState, useEffect } from "react";
import { Festival, ViewMode } from "../type/festival";

interface FestivalContextType {
  festivals: Festival[];
  searchQuery: string;
  viewMode: ViewMode;
  notes: Record<string, string>;
  setSearchQuery: (query: string) => void;
  setViewMode: (mode: ViewMode) => void;
  updateNote: (festivalId: string, note: string) => void;
  setFestivals: (festivals: Festival[]) => void;
}

const FestivalContext = createContext<FestivalContextType | undefined>(
  undefined
);

const initialFestivals: Festival[] = [
  {
    id: "1",
    name: "Dashain",
    date: "2024-10-12",
    description:
      "The biggest Hindu festival in Nepal celebrating the victory of good over evil.",
  },
  {
    id: "2",
    name: "Tihar",
    date: "2024-11-01",
    description:
      "Festival of lights celebrating the bond between brothers and sisters.",
  },
  {
    id: "3",
    name: "Holi",
    date: "2024-03-25",
    description: "The festival of colors welcoming spring season.",
  },
  {
    id: "4",
    name: "Maha Shivaratri",
    date: "2024-03-08",
    description: "A festival honoring Lord Shiva.",
  },
  {
    id: "5",
    name: "Buddha Jayanti",
    date: "2024-05-23",
    description: "Celebration of Buddha's birth, enlightenment, and death.",
  },
];

export const FestivalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [festivals, setFestivals] = useState<Festival[]>(initialFestivals);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [notes, setNotes] = useState<Record<string, string>>(() => {
    const savedNotes = localStorage.getItem("festivalNotes");
    return savedNotes ? JSON.parse(savedNotes) : {};
  });

  useEffect(() => {
    localStorage.setItem("festivalNotes", JSON.stringify(notes));
  }, [notes]);

  const updateNote = (festivalId: string, note: string) => {
    setNotes((prev) => ({
      ...prev,
      [festivalId]: note,
    }));
  };

  return (
    <FestivalContext.Provider
      value={{
        festivals,
        searchQuery,
        viewMode,
        notes,
        setFestivals,
        setSearchQuery,
        setViewMode,
        updateNote,
      }}
    >
      {children}
    </FestivalContext.Provider>
  );
};

export const useFestival = () => {
  const context = useContext(FestivalContext);
  if (!context) {
    throw new Error("useFestival must be used within a FestivalProvider");
  }
  return context;
};
