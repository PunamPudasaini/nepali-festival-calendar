import { ListView } from "../../common/ListView";
import { useFestival } from "../../context/FestivalContext";

export const FestivalLists = () => {
  const { festivals, searchQuery, notes, updateNote } = useFestival();
  const filteredFestivals = festivals
    .filter(
      (festival) =>
        festival.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        festival.date.includes(searchQuery)
    )
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  return (
    <>
      <ListView
        festivals={filteredFestivals}
        notes={notes}
        updateNote={updateNote}
      />
    </>
  );
};
