import { List, Grid } from "lucide-react";
import { useFestivalContext } from "../../context/FestivalContext";
import "./index.css";

interface IProps {}

export const ViewToggle = ({}: IProps) => {
  const { state, dispatch } = useFestivalContext();
  const toggleView = (view: "calendar" | "list") => {
    dispatch({ type: "SET_VIEW", payload: view });
  };

  return (
    <>
      <div className="view-toggle">
        <button
          className={state?.view === "calendar" ? "active" : ""}
          onClick={() => toggleView("calendar")}
        >
          <Grid size={18} />
          Calendar
        </button>
        <button
          className={state?.view === "list" ? "active" : ""}
          onClick={() => toggleView("list")}
        >
          <List size={18} />
          List
        </button>
      </div>
    </>
  );
};
