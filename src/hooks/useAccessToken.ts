import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type Store = {
  accessToken: string | null;
  setAccessToken: (accessToken: string | null) => void;
};

const useAccessToken = create(
  persist<Store>(
    (set) => ({
      accessToken: null,
      setAccessToken: (accessToken) => set({ accessToken }),
    }),
    {
      name: "access-token-store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useAccessToken;
