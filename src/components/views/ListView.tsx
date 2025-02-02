import { useFestivalStore } from "@/store/festivalStore";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const ListView = () => {
  const { festivals, searchQuery } = useFestivalStore();

  const filteredFestivals = festivals.filter(
    (festival: any) =>
      festival.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      festival.date.includes(searchQuery)
  );

  return (
    <div className="bg-white rounded-lg shadow-xl p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Festival</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredFestivals.map((festival) => (
            <TableRow key={festival.id}>
              <TableCell>{festival.date}</TableCell>
              <TableCell className="font-medium">{festival.name}</TableCell>
              <TableCell>{festival.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
