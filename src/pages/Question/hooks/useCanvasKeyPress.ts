import { AppDispatch } from "@/store";
import {
  changeSelectedComponentId,
  copySelectedComponent,
  deleteSelectedComponent,
  pasteClibBoardComponent,
} from "@/store/reducer/question/component";
import { useKeyPress } from "ahooks";
import { useDispatch } from "react-redux";
import useComponentInfo from "./useComponentInfo";

function isActiveElementValid() {
  const activeElement = document.activeElement;
  return activeElement === document.body;
}

export default function useCanvasKeyPress() {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedComponentId, componentList } = useComponentInfo();
  useKeyPress(["backspace", "delete"], () => {
    if (!isActiveElementValid()) {
      return;
    }
    dispatch(deleteSelectedComponent(selectedComponentId));
  });
  useKeyPress(["ctrl.c", "meta.c"], () => {
    if (!isActiveElementValid()) {
      return;
    }
    dispatch(copySelectedComponent());
  });
  useKeyPress(["ctrl.v", "meta.v"], () => {
    if (!isActiveElementValid()) {
      return;
    }
    dispatch(pasteClibBoardComponent());
  });
  useKeyPress(["uparrow"], () => {
    if (!isActiveElementValid()) {
      return;
    }
    const upSelectedComponentIndex =
      componentList.findIndex((r) => r.fe_id === selectedComponentId) - 1;
    if (upSelectedComponentIndex < 0) {
      return;
    }
    dispatch(
      changeSelectedComponentId(componentList[upSelectedComponentIndex].fe_id)
    );
  });
  useKeyPress(["downarrow"], () => {
    if (!isActiveElementValid()) {
      return;
    }
    const upSelectedComponentIndex =
      componentList.findIndex((r) => r.fe_id === selectedComponentId) + 1;
    if (upSelectedComponentIndex >= componentList.length) {
      return;
    }
    dispatch(
      changeSelectedComponentId(componentList[upSelectedComponentIndex].fe_id)
    );
  });
}
