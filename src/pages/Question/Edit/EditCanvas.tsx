import React from "react";
import styles from "./EditCanvas.module.scss";
import { ComponentType } from "@/store/reducer/question/component";
import { Spin } from "antd";
import useComponentList from "../hooks/useComponentList";
import { getComponentConfigureByComponentType } from "@/components/QuestionComponents";

type EditCanvasPropType = {
  loading: boolean;
};

type EditCanvasComponentPropType = {
  component: ComponentType;
};

function Component(props: EditCanvasComponentPropType) {
  const component = getComponentConfigureByComponentType(props.component.type);
  if (!component) {
    return null;
  }

  return (
    <div className={styles["component-wrapper"]}>
      <div className={styles.component}>
        <component.Component {...props.component.props}></component.Component>
      </div>
    </div>
  );
}

export default function EditCanvas(props: EditCanvasPropType) {
  const componentList = useComponentList();

  if (props.loading) {
    return (
      <div style={{ textAlign: "center", marginTop: 24 }}>
        <Spin></Spin>
      </div>
    );
  }
  return (
    <div className={styles.canvas}>
      {componentList.map((r) => (
        <Component component={r} key={r.fe_id}></Component>
      ))}
    </div>
  );
}
