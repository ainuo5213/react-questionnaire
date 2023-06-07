import React from "react";
import { useQuestionnaireDetail } from "../hooks/useQuestionnaire";
import styles from "./index.module.scss";
import EditCanvas from "./EditCanvas";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { changeSelectedComponentId } from "@/store/reducer/question/component";
import LeftPanel from "./LeftPanel";
export default function Edit() {
  const { loading } = useQuestionnaireDetail();
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className={styles.container}>
      <div
        className={styles.header}
        style={{ backgroundColor: "#fff", height: "40px" }}
      >
        Header
      </div>
      <div className={styles["content-wrapper"]}>
        <div className={styles.content}>
          <div className={styles.left}>
            <LeftPanel></LeftPanel>
          </div>
          <div
            className={styles.main}
            onClick={() => dispatch(changeSelectedComponentId(""))}
          >
            <div className={styles["canvas-wrap"]}>
              <EditCanvas loading={loading}></EditCanvas>
            </div>
          </div>
          <div className={styles.right}>Right</div>
        </div>
      </div>
    </div>
  );
}
