import { create } from "zustand";

const useNotificationStore = create((set) => ({
  open: false,
  message: "",
  duration: 3000,
  color: "bg-green-300",
  showNotification: (msg, color, time) =>
    set({
      open: true,
      message: msg,
      duration: time,
      color: color,
    }),
  closeNotification: () =>
    set({ open: false, message: "" }),
}));

export default useNotificationStore;
