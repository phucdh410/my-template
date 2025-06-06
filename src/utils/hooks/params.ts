import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IQueryParamsState<T extends Record<string, any>> {
  params: T;
}
interface IQueryParamsAction<T extends Record<string, any>> {
  setParams: (newParams: T) => void;
}

/**
 * 📌 Usage Guide:
 * Call `useQueryParams` with a unique store name following the format:
 *
 * - query-params-`"yourFeatureName"`
 *
 * Unique name improve searching and avoid conflict data
 *
 * 🔴This hook return a store, you must CALL it to get state
 *
 * Example:
 * ```ts
 * const { params, setParams } = useQueryParams(initialParams, "query-params-user")();
 * ```
 */
function createQueryParamsStore<T extends Record<string, any>>(
  initialParams: T,
  name: string
) {
  return create<IQueryParamsState<T> & IQueryParamsAction<T>>()(
    persist(
      (set) => ({
        params: { page: 1, limit: 10, ...initialParams },
        setParams: (newParams) => set(() => ({ params: newParams })),
      }),
      { name }
    )
  );
}

export const useQueryParams = createQueryParamsStore;
