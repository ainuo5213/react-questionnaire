import {
  ComponentPropType,
  getComponentConfigureByComponentType,
} from "@/components/QuestionComponents";
import useComponentInfo from "@/pages/Question/hooks/useComponentInfo";
import { AppDispatch } from "@/store";
import { changeComponentInfo } from "@/store/reducer/question/component";
import React from "react";
import { useDispatch } from "react-redux";

function Empty() {
  return <div style={{ textAlign: "center" }}>未选中组件</div>;
}

export default function PropSetting() {
  const { selectedComponent, selectedComponentId } = useComponentInfo();
  const dispatch = useDispatch<AppDispatch>();
  if (!selectedComponent) {
    return <Empty></Empty>;
  }
  const { type, props } = selectedComponent;
  const componentConfig = getComponentConfigureByComponentType(type);
  if (!componentConfig) {
    return <Empty></Empty>;
  }
  function handleValueChange(newProps: ComponentPropType) {
    dispatch(
      changeComponentInfo({
        fe_id: selectedComponentId,
        props: newProps,
      })
    );
  }
  return (
    <componentConfig.PropComponent
      {...props}
      onChange={handleValueChange}
      disabled={selectedComponent.isLocked}
    ></componentConfig.PropComponent>
  );
}
