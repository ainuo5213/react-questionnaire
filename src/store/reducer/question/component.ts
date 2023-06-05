import { UserInfo } from "@/api/user/user.types";
import { ComponentPropType } from "@/components/QuestionComponents";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ComponentType {
  fe_id: string;
  type: string;
  title: string;
  props: ComponentPropType;
}

export interface ComponentStateType {
  componentList: ComponentType[];
}

const initialState: ComponentStateType = {
  componentList: [],
};
export const componentSlice = createSlice({
  name: "components",
  initialState,
  reducers: {
    resetComponents(
      state: ComponentStateType,
      data: PayloadAction<ComponentStateType>
    ) {
      state.componentList = data.payload.componentList;
    },
  },
});

export const { resetComponents } = componentSlice.actions;

export default componentSlice.reducer;
