import React from "react";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  DragEndEvent,
  MouseSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type DragSortableItemPropType = {
  id: string;
  children: JSX.Element;
};

export function DragSortableItem(props: DragSortableItemPropType) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });
  if (transform) {
    transform.scaleX = 1;
    transform.scaleY = 1;
  }

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {props.children}
    </div>
  );
}

type DragSortablePropType = {
  children: JSX.Element | JSX.Element[];
  items: Array<{ id: string }>;
  onDragEnd?: (e: DragEndEvent) => void;
};

export default function DragSortableContainer(props: DragSortablePropType) {
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );
  function handleDragEnd(e: DragEndEvent) {
    if (props.onDragEnd) {
      props.onDragEnd(e);
    }
  }
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={props.items}
        strategy={verticalListSortingStrategy}
      >
        {props.children}
      </SortableContext>
    </DndContext>
  );
}
