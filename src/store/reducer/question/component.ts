import { ComponentPropType } from "@/components/QuestionComponents";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ComponentType {
  fe_id: string;
  type: string;
  title: string;
  props: ComponentPropType;
}

export interface ComponentStateType {
  selectedComponentId: string;
  componentList: ComponentType[];
}

const initialState: ComponentStateType = {
  selectedComponentId: "",
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
      state.selectedComponentId = data.payload.selectedComponentId;
    },
    changeSelectedComponentId(
      state: ComponentStateType,
      data: PayloadAction<string>
    ) {
      state.selectedComponentId = data.payload;
    },
    changeComponentInfo(
      state: ComponentStateType,
      data: PayloadAction<ComponentPropType>
    ) {
      const currentComponent = state.componentList.find(
        (r) => r.fe_id === state.selectedComponentId
      );
      if (currentComponent) {
        currentComponent.props = data.payload;
      }
    },
    addComponent(
      state: ComponentStateType,
      data: PayloadAction<ComponentType>
    ) {
      if (state.selectedComponentId) {
        const selectedComponentIndex = state.componentList.findIndex(
          (r) => r.fe_id === state.selectedComponentId
        );
        if (selectedComponentIndex < 0) {
          state.componentList.push(data.payload);
        } else {
          state.componentList.splice(
            selectedComponentIndex + 1,
            0,
            data.payload
          );
        }
      } else {
        state.componentList.push(data.payload);
      }
      state.selectedComponentId = data.payload.fe_id;
    },
  },
});

export const {
  resetComponents,
  changeSelectedComponentId,
  addComponent,
  changeComponentInfo,
} = componentSlice.actions;

export default componentSlice.reducer;
