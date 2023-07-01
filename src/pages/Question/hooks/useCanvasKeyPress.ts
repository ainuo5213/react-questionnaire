import { AppDispatch } from "@/store";
import {
  changeSelectedComponentId,
  copySelectedComponent,
  deleteSelectedComponent,
  exchangeComponentPosition,
  pasteClibBoardComponent,
} from "@/store/reducer/question/component";
import { useKeyPress } from "ahooks";
import { useDispatch } from "react-redux";
import useComponentInfo from "./useComponentInfo";
import { ActionCreators } from "redux-undo";

function isActiveElementValid() {
  const activeElement = document.activeElement;
  return activeElement === document.body;
}

export default function useCanvasKeyPress() {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedComponentId, componentList, selectedComponent } =
    useComponentInfo();
  const selectedComponentIndex = componentList.findIndex(
    (r) => r.fe_id === selectedComponentId
  );
  const upMoveable = selectedComponentIndex > 0 && selectedComponent;

  const downMoveable =
    selectedComponentIndex < componentList.length - 1 && selectedComponent;
  function handleUp() {
    const upComponentId = componentList[selectedComponentIndex - 1]!.id;
    dispatch(
      exchangeComponentPosition({
        from: upComponentId,
        to: selectedComponentId,
      })
    );
  }
  function handleDown() {
    const downComponentId = componentList[selectedComponentIndex + 1]!.id;
    dispatch(
      exchangeComponentPosition({
        from: downComponentId,
        to: selectedComponentId,
      })
    );
  }
  useKeyPress(["backspace", "delete"], () => {
    if (!selectedComponent) {
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
  useKeyPress(["ctrl.uparrow", "meta.uparrow"], (e) => {
    e.preventDefault();
    if (!upMoveable) {
      return;
    }
    handleUp();
  });
  useKeyPress(["ctrl.downarrow", "meta.downarrow"], (e) => {
    e.preventDefault();
    if (!downMoveable) {
      return;
    }
    handleDown();
  });
  useKeyPress(
    ["ctrl.z", "meta.z"],
    () => {
      dispatch(ActionCreators.undo());
    },
    {
      exactMatch: true,
    }
  );
  useKeyPress(["ctrl.shift.z", "meta.shift.z"], (e) => {
    dispatch(ActionCreators.redo());
  });
}
