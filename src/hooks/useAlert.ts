import { create } from "zustand";

const DURATION = 4000;

export type Alert = {
  message: string;
  type: "success" | "error";
};

export type AlertStore = {
  alert?: Alert;
  setAlert: (alert: Alert) => void;
  timeout?: NodeJS.Timeout;
};

const useAlert = create<AlertStore>((set) => ({
  alert: undefined,
  timeout: undefined,
  setAlert: (alert: Alert) =>
    set((state) => {
      if (state.timeout) clearTimeout(state.timeout);
      const timeout = setTimeout(() => set({ alert: undefined }), DURATION);
      return { alert, timeout };
    }),
}));

export default useAlert;
