import { ComponentPropType } from "@/components/QuestionComponents";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getNextComponentId, insertComponent, swapComponent } from "./utils";
import { cloneDeep } from "lodash";
import { v4 as uuidv4 } from "uuid";

export interface ComponentType {
  id: string;
  fe_id: string;
  type: string;
  title: string;
  isHidden: boolean;
  props: ComponentPropType;
  isLocked: boolean;
  isStatistic: boolean;
}

export interface ComponentStateType {
  selectedComponentId: string;
  componentList: ComponentType[];
  clipboardComponent: ComponentType | null;
}

const initialState: ComponentStateType = {
  selectedComponentId: "",
  componentList: [],
  clipboardComponent: null,
};
export const componentSlice = createSlice({
  name: "component",
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
      data: PayloadAction<Pick<ComponentType, "fe_id" | "props">>
    ) {
      const currentComponent = state.componentList.find(
        (r) => r.fe_id === data.payload.fe_id
      );
      if (currentComponent) {
        currentComponent.props = data.payload.props;
      }
    },
    addComponent(
      state: ComponentStateType,
      data: PayloadAction<ComponentType>
    ) {
      insertComponent(state, data.payload);
      state.selectedComponentId = data.payload.fe_id;
    },
    deleteSelectedComponent(
      state: ComponentStateType,
      data: PayloadAction<string>
    ) {
      const nextComponentId = getNextComponentId(
        state.componentList,
        data.payload
      );
      if (nextComponentId) {
        state.selectedComponentId = nextComponentId;
      }
      const selectedComponentIndex = state.componentList.findIndex(
        (r) => r.fe_id === data.payload
      );
      if (selectedComponentIndex > -1) {
        state.componentList.splice(selectedComponentIndex, 1);
      }
    },
    changeComponentVisible(
      state: ComponentStateType,
      data: PayloadAction<Pick<ComponentType, "fe_id" | "isHidden">>
    ) {
      let nextComponentId: string | undefined = "";
      if (data.payload.isHidden) {
        nextComponentId = getNextComponentId(
          state.componentList,
          data.payload.fe_id
        );
      } else {
        nextComponentId = data.payload.fe_id;
      }
      state.selectedComponentId = nextComponentId;

      const currentComponent = state.componentList.find(
        (r) => r.fe_id === data.payload.fe_id
      );
      if (currentComponent) {
        currentComponent.isHidden = data.payload.isHidden;
      }
    },
    toggleComponentLocked(
      state: ComponentStateType,
      data: PayloadAction<string>
    ) {
      const selectedComponent = state.componentList.find(
        (r) => r.fe_id === data.payload
      );
      if (selectedComponent) {
        selectedComponent.isLocked = !selectedComponent.isLocked;
      }
    },
    copySelectedComponent(state: ComponentStateType) {
      const selectedComponent = state.componentList.find(
        (r) => r.fe_id === state.selectedComponentId
      );
      if (selectedComponent) {
        const clipboardComponent = cloneDeep(selectedComponent);

        state.clipboardComponent = clipboardComponent;
      }
    },
    pasteClibBoardComponent(state: ComponentStateType) {
      const clipboardComponent = state.clipboardComponent;
      if (!clipboardComponent) {
        return;
      }
      clipboardComponent.fe_id = uuidv4();
      insertComponent(state, clipboardComponent);
    },
    changeComponentTitle(
      state: ComponentStateType,
      data: PayloadAction<{ fe_id: string; title: string }>
    ) {
      const selectedComponent = state.componentList.find(
        (r) => r.fe_id === data.payload.fe_id
      );
      if (!selectedComponent) {
        return;
      }
      selectedComponent.title = data.payload.title;
    },
    exchangeComponentPosition(
      state: ComponentStateType,
      data: PayloadAction<{ from: string; to: string }>
    ) {
      swapComponent(state.componentList, data.payload.from, data.payload.to);
    },
  },
});

export const {
  resetComponents,
  changeSelectedComponentId,
  addComponent,
  changeComponentInfo,
  deleteSelectedComponent,
  changeComponentVisible,
  toggleComponentLocked,
  copySelectedComponent,
  pasteClibBoardComponent,
  changeComponentTitle,
  exchangeComponentPosition,
} = componentSlice.actions;

export default componentSlice.reducer;
