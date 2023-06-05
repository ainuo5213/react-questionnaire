import { RootState } from "@/store";
import { ComponentType } from "@/store/reducer/question/component";
import { useSelector } from "react-redux";

export default function useComponentList() {
  const componentList = useSelector<RootState>(
    (state) => state.component.componentList
  ) as ComponentType[];

  return componentList;
}
