import React from "react";
import { FestivalProvider } from "./context/FestivalContext";
import { useFestival } from "./context/FestivalContext";
import { SearchBar } from "./common/SearchBar";
import { ViewToggle } from "./common/Toggle";
import { NepaliCalendar } from "./components/Calendar";
import { FestivalLists } from "./components/FestivalList";

const FestivalCalendar: React.FC = () => {
  const { state } = useFestival();

  return (
    <div className="app-container">
      <header className="header">
        <h1>Nepali Festival Calendar</h1>
      </header>
      <div className="headers">
        <SearchBar />
        <ViewToggle />
      </div>
      <main>
        {state.view === "calendar" ? <NepaliCalendar /> : <FestivalLists />}
      </main>
    </div>
  );
};

function App() {
  return (
    <FestivalProvider>
      <FestivalCalendar />
    </FestivalProvider>
  );
}

export default App;
