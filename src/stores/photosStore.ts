import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PhotosStore {
  rotation: number;
  isDragging: boolean;
  startX: number;
  currentRotation: number;
  isLoading: boolean;
  loadedItems: Set<number>;
  errorItems: Set<number>;
  hasAnimated: boolean;

  setRotation: (rotation: number) => void;
  setIsDragging: (isDragging: boolean) => void;
  setStartX: (startX: number) => void;
  setCurrentRotation: (currentRotation: number) => void;
  setIsLoading: (isLoading: boolean) => void;
  addLoadedItem: (index: number) => void;
  addErrorItem: (index: number) => void;
  setHasAnimated: (hasAnimated: boolean) => void;
  reset: () => void;
}

const defaultRotation = 165;

export const usePhotosStore = create<PhotosStore>()(
  persist(
    (set) => ({
      rotation: defaultRotation,
      isDragging: false,
      startX: 0,
      currentRotation: 0,
      isLoading: true,
      loadedItems: new Set<number>(),
      errorItems: new Set<number>(),
      hasAnimated: false,

      setRotation: (rotation) => set({ rotation }),
      setIsDragging: (isDragging) => set({ isDragging }),
      setStartX: (startX) => set({ startX }),
      setCurrentRotation: (currentRotation) => set({ currentRotation }),
      setIsLoading: (isLoading) => set({ isLoading }),
      addLoadedItem: (index) =>
        set((state) => ({
          loadedItems: new Set([...state.loadedItems, index]),
        })),
      addErrorItem: (index) =>
        set((state) => ({
          errorItems: new Set([...state.errorItems, index]),
        })),
      setHasAnimated: (hasAnimated) => set({ hasAnimated }),
      reset: () => {
        if (typeof window !== "undefined") {
          localStorage.removeItem("photos-storage");
        }
        set({
          rotation: defaultRotation,
          isDragging: false,
          startX: 0,
          currentRotation: 0,
          isLoading: true,
          loadedItems: new Set<number>(),
          errorItems: new Set<number>(),
          hasAnimated: false,
        });
      },
    }),
    {
      name: "photos-storage",
      partialize: (state) => ({
        rotation: state.rotation,
      }),
    }
  )
);

