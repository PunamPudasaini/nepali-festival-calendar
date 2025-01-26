import React, { createContext, useContext, useReducer, useEffect } from "react";

export interface Festival {
  date: string;
  name: string;
  description: string;
  isHoliday?: boolean;
  notes?: string;
}

export interface FestivalState {
  festivals: Festival[];
  customFestivals: Festival[];
  notes: Record<string, string>;
  view: "calendar" | "list";
  searchTerm: string;
}

type FestivalAction =
  | { type: "ADD_FESTIVAL"; payload: Festival }
  | {
      type: "UPDATE_FESTIVAL";
      payload: { oldDate: string; oldName: string; festival: Festival };
    }
  | { type: "DELETE_FESTIVAL"; payload: { date: string; name: string } }
  | {
      type: "UPDATE_NOTE";
      payload: { date: string; name: string; note: string };
    }
  | { type: "SET_VIEW"; payload: "calendar" | "list" }
  | { type: "SET_SEARCH"; payload: string };

const initialState: FestivalState = {
  festivals: [],
  customFestivals: [],
  notes: {},
  view: "calendar",
  searchTerm: "",
};

const FestivalContext = createContext<{
  state: FestivalState;
  dispatch: React.Dispatch<FestivalAction>;
} | null>(null);

const festivalReducer = (
  state: FestivalState,
  action: FestivalAction
): FestivalState => {
  switch (action.type) {
    case "ADD_FESTIVAL":
      return {
        ...state,
        customFestivals: [...state.customFestivals, action.payload],
      };
    case "UPDATE_FESTIVAL":
      return {
        ...state,
        customFestivals: state.customFestivals.map((festival) =>
          festival.date === action.payload.oldDate &&
          festival.name === action.payload.oldName
            ? action.payload.festival
            : festival
        ),
      };
    case "DELETE_FESTIVAL":
      return {
        ...state,
        customFestivals: state.customFestivals.filter(
          (festival) =>
            !(
              festival.date === action.payload.date &&
              festival.name === action.payload.name
            )
        ),
      };
    case "UPDATE_NOTE":
      return {
        ...state,
        notes: {
          ...state.notes,
          [`${action.payload.date}-${action.payload.name}`]:
            action.payload.note,
        },
      };
    case "SET_VIEW":
      return {
        ...state,
        view: action.payload,
      };
    case "SET_SEARCH":
      return {
        ...state,
        searchTerm: action.payload,
      };
    default:
      return state;
  }
};

export const FestivalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(festivalReducer, initialState);

  useEffect(() => {
    const savedData = localStorage.getItem("festivalData");
    if (savedData) {
      const { customFestivals, notes } = JSON.parse(savedData);
      if (customFestivals) {
        customFestivals.forEach((festival: Festival) => {
          dispatch({ type: "ADD_FESTIVAL", payload: festival });
        });
      }
      if (notes) {
        Object.entries(notes).forEach(([key, note]) => {
          const [date, name] = key.split("-");
          dispatch({
            type: "UPDATE_NOTE",
            payload: { date, name, note: note as string },
          });
        });
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "festivalData",
      JSON.stringify({
        customFestivals: state.customFestivals,
        notes: state.notes,
      })
    );
  }, [state.customFestivals, state.notes]);

  return (
    <FestivalContext.Provider value={{ state, dispatch }}>
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
