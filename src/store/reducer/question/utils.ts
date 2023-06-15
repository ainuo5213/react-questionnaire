import { ComponentStateType, ComponentType } from "./component";

export function getNextComponentId(
  componentList: ComponentType[],
  fe_id: string
) {
  const notHiddenComponentList = componentList.filter((r) => !r.isHidden);
  const currentSelectedComponentIndex = notHiddenComponentList.findIndex(
    (r) => r.fe_id === fe_id
  );
  if (currentSelectedComponentIndex < 0 || notHiddenComponentList.length <= 1) {
    return "";
  }
  if (currentSelectedComponentIndex === notHiddenComponentList.length - 1) {
    return notHiddenComponentList[currentSelectedComponentIndex - 1].fe_id;
  }
  return notHiddenComponentList[currentSelectedComponentIndex + 1].fe_id;
}

export function insertComponent(
  state: ComponentStateType,
  newComponent: ComponentType
) {
  if (state.selectedComponentId) {
    const selectedComponentIndex = state.componentList.findIndex(
      (r) => r.fe_id === state.selectedComponentId
    );
    if (selectedComponentIndex < 0) {
      state.componentList.push(newComponent);
    } else {
      state.componentList.splice(selectedComponentIndex + 1, 0, newComponent);
    }
  } else {
    state.componentList.push(newComponent);
  }
}
