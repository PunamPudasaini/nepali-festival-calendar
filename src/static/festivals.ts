export interface Festival {
  date: string; // Format: MM-DD
  name: string;
  description: string;
  isHoliday: boolean;
}

export const nepaliFestivals: Festival[] = [
  {
    date: "01-01",
    name: "New Year",
    description: "Nepali New Year celebration",
    isHoliday: true,
  },
  {
    date: "02-19",
    name: "Shivaratri",
    description: "Festival dedicated to Lord Shiva",
    isHoliday: true,
  },
  {
    date: "03-10",
    name: "Holi",
    description: "Festival of colors",
    isHoliday: true,
  },
  {
    date: "04-14",
    name: "Ram Navami",
    description: "Birthday of Lord Ram",
    isHoliday: true,
  },
  {
    date: "08-19",
    name: "Janai Purnima",
    description: "Sacred thread festival",
    isHoliday: true,
  },
  {
    date: "09-15",
    name: "Teej",
    description: "Festival of women",
    isHoliday: true,
  },
  {
    date: "10-15",
    name: "Dashain",
    description: "Major festival celebrating victory of good over evil",
    isHoliday: true,
  },
  {
    date: "11-14",
    name: "Tihar",
    description: "Festival of lights",
    isHoliday: true,
  },
  {
    date: "12-30",
    name: "Tamu Lhosar",
    description: "Gurung New Year",
    isHoliday: true,
  },
];
