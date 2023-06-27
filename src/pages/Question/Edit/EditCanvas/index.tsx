import React from "react";
import styles from "./index.module.scss";
import {
  ComponentType,
  changeSelectedComponentId,
  exchangeComponentPosition,
} from "@/store/reducer/question/component";
import { Spin } from "antd";
import useComponentInfo from "../../hooks/useComponentInfo";
import { getComponentConfigureByComponentType } from "@/components/QuestionComponents";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import classNames from "classnames";
import useCanvasKeyPress from "../../hooks/useCanvasKeyPress";
import { CSS } from "@dnd-kit/utilities";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

type EditCanvasPropType = {
  loading: boolean;
};

type EditCanvasComponentPropType = {
  component: ComponentType;
};

function Component(props: EditCanvasComponentPropType) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.component.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const dispatch = useDispatch<AppDispatch>();
  const selectedId = useSelector<RootState>(
    (r) => r.component.selectedComponentId
  ) as string;
  const component = getComponentConfigureByComponentType(props.component.type);
  if (!component) {
    return null;
  }

  function setSelectedId(e: React.MouseEvent) {
    e.stopPropagation();
    dispatch(changeSelectedComponentId(props.component.fe_id));
  }

  return (
    <div
      className={classNames(
        styles["component-wrapper"],
        selectedId === props.component.fe_id ? styles["selected"] : "",
        props.component.isLocked ? styles.locked : ""
      )}
      onClick={setSelectedId}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <div className={styles.component}>
        <component.Component {...props.component.props}></component.Component>
      </div>
    </div>
  );
}

export default function EditCanvas(props: EditCanvasPropType) {
  const { componentList } = useComponentInfo();
  const dispatch = useDispatch<AppDispatch>();
  useCanvasKeyPress();
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  if (props.loading) {
    return (
      <div style={{ textAlign: "center", marginTop: 24 }}>
        <Spin></Spin>
      </div>
    );
  }
  const notEmptyComponentList = componentList.filter((r) => !r.isHidden);
  function handleDragEnd(e: DragEndEvent) {
    const { active, over } = e;
    if (!over) return;
    if (active.id !== over.id) {
      dispatch(
        exchangeComponentPosition({
          from: active.id as string,
          to: over.id as string,
        })
      );
    }
  }
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className={styles.canvas}>
        <SortableContext
          items={notEmptyComponentList}
          strategy={verticalListSortingStrategy}
        >
          {notEmptyComponentList.map((r) => (
            <Component component={r} key={r.fe_id}></Component>
          ))}
        </SortableContext>
      </div>
    </DndContext>
  );
}
