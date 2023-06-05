import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducer/userInfo";
import componentReducer from "./reducer/question/component";

export const store = configureStore({
  reducer: {
    user: userReducer,
    component: componentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
