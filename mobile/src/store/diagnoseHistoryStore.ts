import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { zustandStorage } from "./storage";
import { STORAGE_NAME } from "../constants";
import { THistory } from "../types";

interface TDiagnoseHistoryState {
  history: THistory[];
  add: (hist: THistory) => void;
  remove: (hist: THistory) => void;
  clear: () => void;
}

export const useDiagnoseHistoryStore = create<TDiagnoseHistoryState>()(
  persist(
    (set, _get) => ({
      history: [],
      clear: () => set({ ..._get(), history: [] }),
      add: (hist) => set({ ..._get(), history: [hist, ..._get().history] }),
      remove: (hist) =>
        set({
          ..._get(),
          history: [..._get().history.filter((f) => f.id !== hist.id)],
        }),
    }),
    {
      name: STORAGE_NAME.HISTORY,
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);
