import React from "react";
import styles from "./index.module.scss";
import {
  ComponentType,
  changeSelectedComponentId,
} from "@/store/reducer/question/component";
import { Spin } from "antd";
import useComponentInfo from "../../hooks/useComponentInfo";
import { getComponentConfigureByComponentType } from "@/components/QuestionComponents";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import classNames from "classnames";

type EditCanvasPropType = {
  loading: boolean;
};

type EditCanvasComponentPropType = {
  component: ComponentType;
};

function Component(props: EditCanvasComponentPropType) {
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
        selectedId === props.component.fe_id ? styles["selected"] : ""
      )}
      onClick={setSelectedId}
    >
      <div className={styles.component}>
        <component.Component {...props.component.props}></component.Component>
      </div>
    </div>
  );
}

export default function EditCanvas(props: EditCanvasPropType) {
  const { componentList } = useComponentInfo();

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
