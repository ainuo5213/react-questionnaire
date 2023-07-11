import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type PageStateType = {
  id: string;
  title: string;
  desc?: string;
  js?: string;
  css?: string;
  isPublished?: boolean;
};

const initialState: PageStateType = {
  id: "",
  title: "",
  desc: "",
  js: "",
  css: "",
  isPublished: false,
};

export const componentSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    changePageInfo(state: PageStateType, data: PayloadAction<PageStateType>) {
      state.id = data.payload.id;
      state.title = data.payload.title;
      state.desc = data.payload.desc;
      state.js = data.payload.js;
      state.css = data.payload.css;
      state.isPublished = data.payload.isPublished;
    },
    changePageTitle(state: PageStateType, data: PayloadAction<string>) {
      state.title = data.payload;
    },
  },
});

export const { changePageInfo, changePageTitle } = componentSlice.actions;

export default componentSlice.reducer;
