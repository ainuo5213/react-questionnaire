import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducer/userInfo";
import questionReducers from "./reducer/question";

export const store = configureStore({
  reducer: {
    user: userReducer,
    ...questionReducers,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
