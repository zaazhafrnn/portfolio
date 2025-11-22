import { create } from "zustand";
import type { SafariProjectKey } from "@/components/apps/SafariApp";

export interface SafariState {
    history: Array<SafariProjectKey | null>;
    historyIndex: number;
}

interface SafariStore {
    states: Record<number, SafariState>;

    getState: (windowId: number) => SafariState | undefined;
    setState: (windowId: number, state: SafariState) => void;
    clearState: (windowId: number) => void;
    clearAllStates: () => void;
    cleanupClosedWindows: (openWindowIds: number[]) => void;
}

const defaultState: SafariState = {
    history: [null],
    historyIndex: 0,
};

export const useSafariStore = create<SafariStore>((set, get) => ({
    states: {},

    getState: (windowId: number) => {
        return get().states[windowId] ?? defaultState;
    },

    setState: (windowId: number, state: SafariState) => {
        set((store) => ({
            states: {
                ...store.states,
                [windowId]: state,
            },
        }));
    },

    clearState: (windowId: number) => {
        set((store) => {
            const { [windowId]: _, ...rest } = store.states;
            return { states: rest };
        });
    },

    clearAllStates: () => {
        set({ states: {} });
    },

    cleanupClosedWindows: (openWindowIds: number[]) => {
        set((store) => {
            const cleaned: Record<number, SafariState> = {};
            const openIdsSet = new Set(openWindowIds);

            Object.keys(store.states).forEach((key) => {
                const windowId = Number(key);
                if (openIdsSet.has(windowId)) {
                    cleaned[windowId] = store.states[windowId];
                }
            });

            return { states: cleaned };
        });
    },
}));

