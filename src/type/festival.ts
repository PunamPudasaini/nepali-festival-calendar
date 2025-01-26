export interface Festival {
  isHoliday?: any;
  id: string;
  name: string;
  date: string;
  description: string;
  notes?: string;
}

export type ViewMode = "list" | "calendar";
