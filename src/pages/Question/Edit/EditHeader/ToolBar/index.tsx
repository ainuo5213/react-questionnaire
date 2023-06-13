import useComponentInfo from "@/pages/Question/hooks/useComponentInfo";
import { AppDispatch } from "@/store";
import {
  changeSelectedComponentId,
  deleteSelectedComponent,
} from "@/store/reducer/question/component";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Space, Tooltip } from "antd";
import React from "react";
import { useDispatch } from "react-redux";

export default function ToolBar() {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedComponentId, componentList } = useComponentInfo();
  function handleDelete() {
    const currentSelectedComponentIndex = componentList.findIndex(
      (r) => r.fe_id === selectedComponentId
    );
    const nextComponent = componentList[currentSelectedComponentIndex + 1];
    if (nextComponent) {
      dispatch(changeSelectedComponentId(nextComponent.fe_id));
    }
    dispatch(deleteSelectedComponent(selectedComponentId));
  }
  return (
    <Space>
      <Tooltip title="删除">
        <Button
          onClick={handleDelete}
          shape="circle"
          icon={<DeleteOutlined></DeleteOutlined>}
        ></Button>
      </Tooltip>
    </Space>
  );
}
