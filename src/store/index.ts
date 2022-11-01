import create from "zustand";
import { UpdateTaskInput } from "../schema/todo";

type Store = {
  editedTask: UpdateTaskInput;
  updateEditedTask: (payload: UpdateTaskInput) => void;
  resetEditedTask: () => void;
};

export const useStore = create<Store>((set) => ({
  editedTask: { taskId: "", title: "", body: "" },
  updateEditedTask: (payload) => set({ editedTask: payload }),
  resetEditedTask: () =>
    set({ editedTask: { taskId: "", title: "", body: "" } }),
}));
