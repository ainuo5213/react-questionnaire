import React, { ChangeEvent, useRef, useState } from "react";
import styles from "./index.module.scss";
import { Button, Input, InputRef, Space, Typography, message } from "antd";
import { EditOutlined, LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import ToolBar from "./ToolBar";
import usePageInfo from "../../hooks/usePageInfo";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { changePageTitle } from "@/store/reducer/question/page";
const { Title } = Typography;
function EditTitle() {
  const { pageInfo } = usePageInfo();
  const [isInput, setIsInput] = useState(false);
  const [pageTitle, setPageTitle] = useState(pageInfo.title || "");
  const dispatch = useDispatch<AppDispatch>();
  function handleEditClick() {
    setIsInput(true);
    setTimeout(() => {
      inputRef.current?.focus();
    });
  }
  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setPageTitle(value);
  }
  function handleBlur() {
    if (pageTitle.length === 0) {
      message.warning("问卷标题不能为空");
      return;
    }
    dispatch(changePageTitle(pageTitle));
    setIsInput(false);
  }
  const inputRef = useRef<InputRef | null>(null);
  return (
    <Space>
      {isInput ? (
        <Input
          value={pageTitle}
          onChange={handleInputChange}
          onBlur={handleBlur}
          onPressEnter={handleBlur}
          ref={inputRef}
        ></Input>
      ) : (
        <Title>{pageInfo.title}</Title>
      )}
      {isInput ? null : (
        <EditOutlined
          className={styles.edit}
          onClick={handleEditClick}
        ></EditOutlined>
      )}
    </Space>
  );
}
export default function EditHeader() {
  const nav = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.left}>
          <Space>
            <Button
              type="link"
              icon={<LeftOutlined></LeftOutlined>}
              onClick={() => nav(-1)}
            >
              返回
            </Button>
            <EditTitle></EditTitle>
          </Space>
        </div>
        <div className={styles.main}>
          <ToolBar></ToolBar>
        </div>
        <div className={styles.right}>
          <Space>
            <Button>保存</Button>
            <Button type="primary">发布</Button>
          </Space>
        </div>
      </div>
    </div>
  );
}
