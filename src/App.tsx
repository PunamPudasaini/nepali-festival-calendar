import React from "react";
import { FestivalProvider } from "./context/FestivalContext";
import { useFestival } from "./context/FestivalContext";
import { Calendar } from "lucide-react";
import { SearchBar } from "./common/SearchBar";
import { ViewToggle } from "./common/Toggle";
import { NepaliCalendar } from "./components/Calendar";
import { FestivalLists } from "./components/FestivalList";

const FestivalCalendar: React.FC = () => {
  const { viewMode } = useFestival();

  return (
    <div className="app-container">
      <header>
        <div className="header-content">
          <Calendar size={32} className="header-icon" />
          <h1>Nepali Festival Calendar</h1>
        </div>
        <SearchBar />
        <ViewToggle />
      </header>
      <main>
        {viewMode === "list" ? <FestivalLists /> : <NepaliCalendar />}
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
