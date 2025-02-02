import { useState } from "react";
import { useFestivalStore } from "../store/festivalStore";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { CalendarIcon, List, PlusIcon, Search } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { NepaliCalendar } from "../components/calendar/NepaliCalendar";
import { ListView } from "../components/views/ListView";
import { AddFestivalDialog } from "../components/calendar/AddFestivalDialog";

const Home = () => {
  const { setSearchQuery } = useFestivalStore();
  const [searchInput, setSearchInput] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchInput);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-lg shadow">
          <h1 className="text-base sm:text-2xl font-bold text-destructive-100">
            Nepali Festivals Calendar
          </h1>

          <div className="flex items-center gap-4">
            <form onSubmit={handleSearch} className="flex gap-2">
              <Input
                type="text"
                placeholder="Search festivals..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full sm:w-64"
              />
              <Button type="submit" variant="ghost">
                <Search className="h-5 w-5" />
              </Button>
            </form>

            <Button
              variant="outline"
              onClick={() => setIsAddDialogOpen(true)}
              className="px-2 sm:px-4 flex"
            >
              <PlusIcon className="h-2 sm:h-5 w-2 sm:w-5 sm:mr-2" />
              <span className="hidden sm:flex"> Add Festival</span>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="calendar" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger
              value="calendar"
              className="flex items-center gap-2 py-3"
            >
              <CalendarIcon className="h-5 w-5" />
              Calendar View
            </TabsTrigger>
            <TabsTrigger value="list" className="flex items-center gap-2 py-3">
              <List className="h-5 w-5" />
              List View
            </TabsTrigger>
          </TabsList>
          <TabsContent value="calendar">
            <NepaliCalendar />
          </TabsContent>
          <TabsContent value="list">
            <ListView />
          </TabsContent>
        </Tabs>
      </div>

      <AddFestivalDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
      />
    </div>
  );
};

export default Home;
