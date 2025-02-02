import { create } from "zustand";
import NepaliDate from "nepali-date-converter";
import { Festival } from "@/type/festival";
import { nepaliFestivals } from "@/static/festivals";

interface FestivalStore {
  festivals: Festival[];
  selectedDate: NepaliDate;
  view: "calendar" | "list";
  searchQuery: string;
  setSelectedDate: (date: NepaliDate) => void;
  toggleView: () => void;
  setSearchQuery: (query: string) => void;
  addFestival: (festival: Omit<Festival, "id">) => void;
  updateFestival: (id: string, updatedFestival: Partial<Festival>) => void;
  deleteFestival: (id: string) => void;
  updateNotes: (id: string, notes: string) => void;
}

export const useFestivalStore = create<FestivalStore>((set) => {
  // Load data from localStorage
  const storedFestivals = localStorage.getItem("festivals");
  const storedView = localStorage.getItem("view");

  const initialFestivals: Festival[] = [
    ...(storedFestivals ? JSON.parse(storedFestivals) : []),
    ...nepaliFestivals,
  ];

  const initialSelectedDate = new NepaliDate();

  const initialView: "calendar" | "list" =
    storedView === "list" ? "list" : "calendar";

  return {
    festivals: initialFestivals,
    selectedDate: initialSelectedDate,
    view: initialView,
    searchQuery: "",
    setSelectedDate: (date) => {
      set({ selectedDate: date });
      // localStorage.setItem("selectedDate", JSON.stringify(date));
    },
    toggleView: () =>
      set((state) => {
        const newView = state.view === "calendar" ? "list" : "calendar";
        localStorage.setItem("view", newView);
        return { view: newView };
      }),
    setSearchQuery: (query) => set({ searchQuery: query }),
    addFestival: (festival) =>
      set((state) => {
        const newFestival = { ...festival, id: Date.now().toString() };
        const updatedFestivals = [...state.festivals, newFestival];
        localStorage.setItem("festivals", JSON.stringify(updatedFestivals));
        return { festivals: updatedFestivals };
      }),
    updateNotes: (id, notes) =>
      set((state) => {
        const updatedFestivals = state.festivals.map((f) =>
          f.id === id ? { ...f, notes } : f
        );
        localStorage.setItem("festivals", JSON.stringify(updatedFestivals));
        return { festivals: updatedFestivals };
      }),
    updateFestival: (id, updatedFestival) =>
      set((state) => {
        const updatedFestivals = state.festivals.map((f) =>
          f.id === id ? { ...f, ...updatedFestival } : f
        );
        localStorage.setItem("festivals", JSON.stringify(updatedFestivals));
        return { festivals: updatedFestivals };
      }),
    deleteFestival: (id) =>
      set((state) => {
        const updatedFestivals = state.festivals.filter((f) => f.id !== id);
        localStorage.setItem("festivals", JSON.stringify(updatedFestivals));
        return { festivals: updatedFestivals };
      }),
  };
});
