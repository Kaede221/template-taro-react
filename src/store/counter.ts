import { create } from "zustand/react";
import { persist } from "zustand/middleware";
import Taro from "@tarojs/taro";

interface ICounterStore {
  counter: number;
  increment: () => void;
}

const useCounterStore = create<ICounterStore>()(
  persist(
    (set, get) => ({
      counter: 0,
      increment: () => {
        set({
          counter: get().counter + 1,
        });
      },
    }),
    {
      name: "counter-store-lc",
      storage: {
        getItem: Taro.getStorageSync,
        setItem: Taro.setStorageSync,
        removeItem: Taro.removeStorageSync,
      },
    },
  ),
);

export default useCounterStore;
