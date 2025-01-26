import { useState } from "react";
import { Festival, useFestival } from "../../context/FestivalContext";
import { FestivalList } from "../../common/ListView/FestivalList";
import { FestivalModal } from "../../common/Modal/FestivalModal";

export const FestivalLists = () => {
  const { state, dispatch } = useFestival();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<{
    date: number;
    month: number;
  } | null>(null);
  const [editingFestival, setEditingFestival] = useState<{
    oldDate: string;
    oldName: string;
  } | null>(null);
  const [festivalForm, setFestivalForm] = useState<Festival>({
    name: "",
    description: "",
    isHoliday: false,
    date: "",
  });

  const resetForm = () => {
    setFestivalForm({
      name: "",
      description: "",
      isHoliday: false,
      date: "",
    });
    setEditingFestival(null);
    setSelectedDay(null);
  };

  const openModal = (day?: { date: number; month: number }) => {
    if (day) {
      setSelectedDay(day);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleEditFestival = (festival: any) => {
    setEditingFestival({ oldDate: festival.date, oldName: festival.name });
    setFestivalForm({
      name: festival.name,
      description: festival.description,
      isHoliday: festival.isHoliday,
      date: festival.date,
    });
    setIsModalOpen(true);
  };

  const handleDeleteFestival = (date: string, name: string) => {
    if (window.confirm("Are you sure you want to delete this festival?")) {
      dispatch({ type: "DELETE_FESTIVAL", payload: { date, name } });
    }
  };

  const handleSaveFestival = () => {
    if (!festivalForm.name) return;

    const dateString = selectedDay
      ? `${(selectedDay.month + 1)
          .toString()
          .padStart(2, "0")}-${selectedDay.date.toString().padStart(2, "0")}`
      : festivalForm.date;

    if (!dateString) return;

    const festival = {
      date: dateString,
      name: festivalForm.name,
      description: festivalForm.description,
      isHoliday: festivalForm.isHoliday,
    };

    if (editingFestival) {
      dispatch({
        type: "UPDATE_FESTIVAL",
        payload: {
          oldDate: editingFestival.oldDate,
          oldName: editingFestival.oldName,
          festival,
        },
      });
    } else {
      dispatch({ type: "ADD_FESTIVAL", payload: festival });
    }

    closeModal();
  };

  const handleUpdateNote = (date: string, name: string, note: string) => {
    dispatch({ type: "UPDATE_NOTE", payload: { date, name, note } });
  };

  const filteredFestivals = [
    ...state.festivals,
    ...state.customFestivals,
  ].filter((festival) => {
    const searchLower = state.searchTerm.toLowerCase();
    return (
      festival.name.toLowerCase().includes(searchLower) ||
      festival.description.toLowerCase().includes(searchLower) ||
      festival.date.includes(searchLower)
    );
  });

  return (
    <>
      <FestivalList
        festivals={filteredFestivals}
        onEdit={handleEditFestival}
        onDelete={handleDeleteFestival}
        onUpdateNote={handleUpdateNote}
        onAddNew={() => openModal()}
        state={state}
      />

      {isModalOpen && (
        <FestivalModal
          form={festivalForm}
          onChangeForm={setFestivalForm}
          onSave={handleSaveFestival}
          onClose={closeModal}
          selectedDay={selectedDay}
          editingFestival={editingFestival}
        />
      )}
    </>
  );
};
