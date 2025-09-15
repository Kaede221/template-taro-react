import { configureStore } from "@reduxjs/toolkit";
import Taro from "@tarojs/taro";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import userReducer from "./features/user/userSlice";

// 这个storage是一个封装 不能删
export const storage = {
  getItem(key: any) {
    return Taro.getStorage({ key }).then((res) => {
      return res.data;
    });
  },
  setItem(key: any, data: any) {
    return Taro.setStorage({ key, data });
  },
  removeItem(key: any) {
    return Taro.removeStorage({ key });
  },
  clear: Taro.clearStorage,
};

const userPersistConfig = {
  key: "user",
  storage,
  throttle: 10,
};

const rootReducer = {
  user: persistReducer(userPersistConfig, userReducer),
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
