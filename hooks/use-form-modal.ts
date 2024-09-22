import { FormData } from "@/types";
import { create } from "zustand";

interface FormModalStore {
  isOpen: boolean;
  data?: FormData;
  onOpen: (data: FormData) => void;
  onClose: () => void;
}

const useFormModal = create<FormModalStore>((set) => ({
  isOpen: false,
  data: undefined,
  onOpen: (data: FormData) => set({ data, isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useFormModal;
