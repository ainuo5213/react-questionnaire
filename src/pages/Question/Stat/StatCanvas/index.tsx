import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { ComponentType } from "@/store/reducer/question/component";
import useComponentInfo from "../../hooks/useComponentInfo";
import { getComponentConfigureByComponentType } from "@/components/QuestionComponents";
import classNames from "classnames";
type StatCanvasComponentPropType = {
  selectedId: string;
  onSelect: (id: string) => void;
  component: ComponentType;
};

function Component(props: StatCanvasComponentPropType) {
  const component = getComponentConfigureByComponentType(props.component.type);
  if (!component) {
    return null;
  }

  function setSelectedId(e: React.MouseEvent) {
    e.stopPropagation();
    props.onSelect(props.component.fe_id);
  }

  return (
    <div
      className={classNames(
        styles["component-wrapper"],
        props.selectedId === props.component.fe_id ? styles["selected"] : ""
      )}
      onClick={setSelectedId}
    >
      <div className={styles.component}>
        <component.Component {...props.component.props}></component.Component>
      </div>
    </div>
  );
}

type StatCanvasPropType = {
  selectedId: string;
  selectedType: string;
  onSelect: (selectedId: string) => void;
};

export default function StatCanvas(props: StatCanvasPropType) {
  const { componentList } = useComponentInfo();
  const notEmptyComponentList = componentList.filter((r) => !r.isHidden);
  return (
    <div className={styles.canvas}>
      {notEmptyComponentList.map((r) => (
        <Component
          key={r.fe_id}
          component={r}
          selectedId={props.selectedId}
          onSelect={props.onSelect}
        ></Component>
      ))}
    </div>
  );
}
