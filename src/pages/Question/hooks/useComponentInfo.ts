import { RootState } from "@/store";
import { ComponentStateType } from "@/store/reducer/question/component";
import { useSelector } from "react-redux";

export default function useComponentInfo() {
  const component = useSelector<RootState>(
    (state) => state.component.present
  ) as ComponentStateType;

  return {
    componentList: component.componentList,
    selectedComponentId: component.selectedComponentId,
    selectedComponent: component.componentList.find(
      (r) => r.fe_id === component.selectedComponentId
    ),
    clipboardComponent: component.clipboardComponent,
  };
}
