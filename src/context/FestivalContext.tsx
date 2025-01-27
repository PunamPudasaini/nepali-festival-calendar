import React, { createContext, useContext, useReducer, useEffect } from "react";
import { Festival } from "../type/festival";

interface FestivalState {
  festivals: Festival[];
  selectedDate: string;
  view: "calendar" | "list";
  searchQuery: string;
}

type FestivalAction =
  | { type: "ADD_FESTIVAL"; payload: Festival }
  | { type: "UPDATE_FESTIVAL"; payload: Festival }
  | { type: "DELETE_FESTIVAL"; payload: string }
  | { type: "UPDATE_NOTES"; payload: { id: string; notes: string } }
  | { type: "SET_SELECTED_DATE"; payload: string }
  | { type: "LOAD_FESTIVALS"; payload: Festival[] }
  | { type: "SET_VIEW"; payload: "calendar" | "list" }
  | { type: "SET_SEARCH"; payload: string };

const loadSavedFestivals = (): Festival[] => {
  const saved = localStorage.getItem("festivals");
  return saved ? JSON.parse(saved) : [];
};

const loadSavedView = () => {
  const saved = localStorage.getItem("view");
  return saved ? JSON.parse(saved) : "calendar";
};

const initialState: FestivalState = {
  festivals: loadSavedFestivals(),
  // selectedDate: new Date().toISOString().split("T")[0],
  selectedDate: "",
  view: loadSavedView(),
  searchQuery: "",
};

const festivalReducer = (
  state: FestivalState,
  action: FestivalAction
): FestivalState => {
  switch (action.type) {
    case "ADD_FESTIVAL":
      return {
        ...state,
        festivals: [...state.festivals, action.payload],
      };

    case "UPDATE_FESTIVAL":
      return {
        ...state,
        festivals: state.festivals.map((festival) =>
          festival.id === action.payload.id ? action.payload : festival
        ),
      };

    case "DELETE_FESTIVAL":
      return {
        ...state,
        festivals: state.festivals.filter(
          (festival) => festival.id !== action.payload
        ),
      };

    case "UPDATE_NOTES":
      return {
        ...state,
        festivals: state.festivals.map((festival) =>
          festival.id === action.payload.id
            ? { ...festival, notes: action.payload.notes }
            : festival
        ),
      };

    case "SET_SELECTED_DATE":
      return {
        ...state,
        selectedDate: action.payload,
      };

    case "LOAD_FESTIVALS":
      return {
        ...state,
        festivals: action.payload,
      };

    case "SET_VIEW":
      return {
        ...state,
        view: action.payload,
      };

    case "SET_SEARCH":
      return {
        ...state,
        searchQuery: action.payload,
      };

    default:
      return state;
  }
};

const FestivalContext = createContext<{
  state: FestivalState;
  dispatch: React.Dispatch<FestivalAction>;
}>({ state: initialState, dispatch: () => null });

export const FestivalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(festivalReducer, initialState);

  // Load festivals from localStorage on initial mount
  useEffect(() => {
    const savedFestivals = loadSavedFestivals();
    const savedView = loadSavedView();
    dispatch({ type: "LOAD_FESTIVALS", payload: savedFestivals });
    dispatch({ type: "SET_VIEW", payload: savedView });
  }, []);

  useEffect(() => {
    localStorage.setItem("festivals", JSON.stringify(state.festivals));
    localStorage.setItem("view", JSON.stringify(state.view));
  }, [state.festivals, state.view]);

  return (
    <FestivalContext.Provider value={{ state, dispatch }}>
      {children}
    </FestivalContext.Provider>
  );
};

export const useFestivalContext = () => useContext(FestivalContext);
