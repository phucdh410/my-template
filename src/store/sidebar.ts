import { create } from "zustand";
import { persist } from "zustand/middleware";

type TSidebarState = {
  open: boolean;
};

type TSidebarAction = {
  toggleSidebar: () => void;
};

export const useSidebar = create<TSidebarState & TSidebarAction>()(
  persist(
    (set) => ({
      open: true,
      toggleSidebar: () => set((state) => ({ open: !state.open })),
    }),
    { name: "sidebar" }
  )
);
