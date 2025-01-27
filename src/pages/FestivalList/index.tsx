import { FestivalListView } from "../../page/FestivalList";
import { Festival } from "../../type/festival";

interface FestivalListProps {
  onEdit: (festival: Festival) => void;
}

export const FestivalList = ({ onEdit }: FestivalListProps) => {
  return (
    <>
      <FestivalListView onEdit={onEdit} />
    </>
  );
};
