import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface UI {
  sidebarOpen: boolean;
  setSidebarOpen: () => void;
  sidebarWidth: string | number;
  setSidebarWidth: (width: string | number) => void;
}

export const useUiStore = create<UI>()(
  devtools(
    persist(
      (set) => ({
        sidebarOpen: true,
        sidebarWidth: 240,
        setSidebarOpen: () => {
          set((state) => ({
            ...state,
            sidebarOpen: !state.sidebarOpen,
          }));
        },
        setSidebarWidth: (width: number | string) => {
          set((state) => ({
            ...state,
            sidebarWidth: width,
          }));
        },
      }),
      {
        name: "ui",
      }
    ),
    {
      name: "ui-store",
      features: {
        dispatch: true,
        jump: true,
        pause: true,
        persist: true,
        skip: true,
      },
      enabled: true,
    }
  )
);
