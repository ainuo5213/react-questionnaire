import useComponentInfo from "@/pages/Question/hooks/useComponentInfo";
import { AppDispatch } from "@/store";
import {
  changeComponentVisible,
  copySelectedComponent,
  deleteSelectedComponent,
  toggleComponentLocked,
  pasteClibBoardComponent,
} from "@/store/reducer/question/component";
import {
  DeleteOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  CopyOutlined,
  BlockOutlined,
} from "@ant-design/icons";
import { Button, Space, Tooltip } from "antd";
import React from "react";
import { useDispatch } from "react-redux";

export default function ToolBar() {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedComponentId, selectedComponent, clipboardComponent } =
    useComponentInfo();
  function handleDelete() {
    dispatch(deleteSelectedComponent(selectedComponentId));
  }
  function handleInVisible() {
    dispatch(
      changeComponentVisible({
        fe_id: selectedComponentId,
        isHidden: true,
      })
    );
  }
  function handleLock() {
    dispatch(toggleComponentLocked(selectedComponentId));
  }
  function handleCopy() {
    dispatch(copySelectedComponent());
  }
  function handlePaste() {
    dispatch(pasteClibBoardComponent());
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
      <Tooltip title="隐藏">
        <Button
          onClick={handleInVisible}
          shape="circle"
          icon={<EyeInvisibleOutlined></EyeInvisibleOutlined>}
        ></Button>
      </Tooltip>
      <Tooltip title="锁定">
        <Button
          onClick={handleLock}
          shape="circle"
          type={selectedComponent?.isLocked ? "primary" : "default"}
          icon={<LockOutlined></LockOutlined>}
        ></Button>
      </Tooltip>
      <Tooltip title="复制">
        <Button
          onClick={handleCopy}
          shape="circle"
          icon={<CopyOutlined></CopyOutlined>}
        ></Button>
      </Tooltip>
      <Tooltip title="粘贴">
        <Button
          disabled={!!clipboardComponent === false}
          onClick={handlePaste}
          shape="circle"
          icon={<BlockOutlined></BlockOutlined>}
        ></Button>
      </Tooltip>
    </Space>
  );
}
