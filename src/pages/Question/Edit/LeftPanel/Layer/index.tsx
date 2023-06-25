import useComponentInfo from "@/pages/Question/hooks/useComponentInfo";
import classNames from "classnames";
import styles from "./index.module.scss";
import {
  ComponentType,
  changeComponentTitle,
  changeComponentVisible,
  changeSelectedComponentId,
  toggleComponentLocked,
} from "@/store/reducer/question/component";
import { Button, Input, InputRef, Space, message } from "antd";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { ChangeEvent, useRef, useState } from "react";
import { EyeInvisibleOutlined, LockOutlined } from "@ant-design/icons";

export default function Layer() {
  const { componentList, selectedComponentId } = useComponentInfo();
  const dispatch = useDispatch<AppDispatch>();
  const [changingTitleId, setChangingTitleId] = useState("");

  function handleTitleClick(r: ComponentType) {
    setChangingTitleId("");
    if (r.isHidden) {
      message.info("无法选中已隐藏的组件");
      return;
    }
    if (r.fe_id === selectedComponentId) {
      setChangingTitleId(r.fe_id);
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      });
      return;
    }
    dispatch(changeSelectedComponentId(r.fe_id));
  }

  function handleInputSave() {
    setChangingTitleId("");
  }

  function handleTitleChange(
    r: ComponentType,
    e: ChangeEvent<HTMLInputElement>
  ) {
    if (!e.target.value || !changingTitleId) {
      return;
    }
    dispatch(
      changeComponentTitle({
        fe_id: r.fe_id,
        title: e.target.value,
      })
    );
  }

  function handleChangeLock(r: ComponentType) {
    dispatch(
      changeComponentVisible({
        fe_id: r.fe_id,
        isHidden: !r.isHidden,
      })
    );
  }

  function handleChangeHidden(r: ComponentType) {
    dispatch(toggleComponentLocked(r.fe_id));
  }

  const inputRef = useRef<InputRef | null>(null);

  return (
    <>
      {componentList.map((r) => {
        const { fe_id, isHidden, isLocked, title } = r;
        return (
          <div key={fe_id} className={classNames([styles["layer-item"]])}>
            <div className={styles.left}>
              {fe_id === changingTitleId ? (
                <Input
                  value={r.title}
                  onPressEnter={handleInputSave}
                  onBlur={handleInputSave}
                  onChange={(e) => handleTitleChange(r, e)}
                  ref={inputRef}
                ></Input>
              ) : (
                <div
                  onClick={() => handleTitleClick(r)}
                  className={classNames([
                    styles.title,
                    { [styles.selected]: selectedComponentId === fe_id },
                  ])}
                >
                  {title}
                </div>
              )}
            </div>
            <div className={styles.right}>
              <Space>
                <Button
                  onClick={() => handleChangeLock(r)}
                  icon={<EyeInvisibleOutlined></EyeInvisibleOutlined>}
                  type={isHidden ? "primary" : "text"}
                  className={classNames({
                    [styles.btn]: !isHidden,
                  })}
                  shape="circle"
                ></Button>
                <Button
                  onClick={() => handleChangeHidden(r)}
                  icon={<LockOutlined></LockOutlined>}
                  type={isLocked ? "primary" : "text"}
                  className={classNames({
                    [styles.btn]: !isLocked,
                  })}
                  shape="circle"
                ></Button>
              </Space>
            </div>
          </div>
        );
      })}
    </>
  );
}
