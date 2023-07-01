import useComponentInfo from "@/pages/Question/hooks/useComponentInfo";
import { AppDispatch } from "@/store";
import {
  changeComponentVisible,
  copySelectedComponent,
  deleteSelectedComponent,
  toggleComponentLocked,
  pasteClibBoardComponent,
  exchangeComponentPosition,
} from "@/store/reducer/question/component";
import {
  DeleteOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  CopyOutlined,
  BlockOutlined,
  DownOutlined,
  UpOutlined,
  RedoOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import { Button, Space, Tooltip } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { ActionCreators } from "redux-undo";

export default function ToolBar() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    selectedComponentId,
    selectedComponent,
    clipboardComponent,
    componentList,
  } = useComponentInfo();
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
  function handleUndo() {
    dispatch(ActionCreators.undo());
  }
  function handleRedo() {
    dispatch(ActionCreators.redo());
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
      <Tooltip title="上移">
        <Button
          disabled={!upMoveable}
          onClick={handleUp}
          shape="circle"
          icon={<UpOutlined></UpOutlined>}
        ></Button>
      </Tooltip>
      <Tooltip title="下移">
        <Button
          disabled={!downMoveable}
          onClick={handleDown}
          shape="circle"
          icon={<DownOutlined></DownOutlined>}
        ></Button>
      </Tooltip>
      <Tooltip title="撤销">
        <Button
          onClick={handleUndo}
          shape="circle"
          icon={<UndoOutlined></UndoOutlined>}
        ></Button>
      </Tooltip>
      <Tooltip title="重做">
        <Button
          onClick={handleRedo}
          shape="circle"
          icon={<RedoOutlined></RedoOutlined>}
        ></Button>
      </Tooltip>
    </Space>
  );
}
