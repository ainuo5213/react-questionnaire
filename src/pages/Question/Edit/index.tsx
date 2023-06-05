import React from "react";
import { useQuestionnaireDetail } from "../hooks/useQuestionnaire";
import styles from "./index.module.scss";
import EditCanvas from "./EditCanvas";
export default function Edit() {
  const { loading } = useQuestionnaireDetail();
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
          <div className={styles.left}>Left</div>
          <div className={styles.main}>
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
