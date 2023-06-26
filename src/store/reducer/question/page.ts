import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type PageStateType = {
  title: string;
  desc?: string;
  js?: string;
  css?: string;
};

const initialState: PageStateType = {
  title: "",
  desc: "",
  js: "",
  css: "",
};

export const componentSlice = createSlice({
  name: "components",
  initialState,
  reducers: {
    changePageInfo(state: PageStateType, data: PayloadAction<PageStateType>) {
      state.title = data.payload.title;
      state.desc = data.payload.desc;
      state.js = data.payload.js;
      state.css = data.payload.css;
    },
    changePageTitle(state: PageStateType, data: PayloadAction<string>) {
      state.title = data.payload;
    },
  },
});

export const { changePageInfo, changePageTitle } = componentSlice.actions;

export default componentSlice.reducer;
