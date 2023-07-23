import React, { useEffect, useState } from "react";
import { useQuestionnaireDetail } from "../hooks/useQuestionnaire";
import { Button, Result, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { useTitle } from "ahooks";
import usePageInfo from "../hooks/usePageInfo";
import styles from "./index.module.scss";
import { PageStateType } from "@/store/reducer/question/page";
import StatHeader from "./StatHeader";
import StatCanvas from "./StatCanvas";
import StatTable from "./StatTable";
import useComponentInfo from "../hooks/useComponentInfo";
import StatChart from "./StatChart";
import { Empty } from "antd";
import { getComponentConfigureByComponentType } from "@/components/QuestionComponents";
function Loading() {
  return (
    <div style={{ textAlign: "center" }}>
      <Spin></Spin>
    </div>
  );
}

function Content({ data }: { data: PageStateType }) {
  const [selectedId, setSelectedId] = useState("");
  const { componentList } = useComponentInfo();
  const [selectedComponentType, setSelectedComponentType] = useState("");
  useEffect(() => {
    if (selectedId) {
      setSelectedComponentType(
        componentList.find((r) => r.fe_id === selectedId)!.type
      );
    } else {
      setSelectedComponentType("");
    }
  }, [selectedId]);
  const navigate = useNavigate();
  if (!data?.isPublished) {
    return (
      <div style={{ flex: "1" }}>
        <Result
          status={"warning"}
          title="该问卷尚未发布"
          subTitle="抱歉，您访问的页面不存在"
          extra={
            <Button type="primary" onClick={() => navigate(-1)}>
              返回首页
            </Button>
          }
        />
      </div>
    );
  }
  const componentConfig = getComponentConfigureByComponentType(
    selectedComponentType
  );
  return (
    <>
      <div className={styles.left}>
        <StatCanvas
          selectedId={selectedId}
          selectedType={selectedComponentType}
          onSelect={setSelectedId}
        ></StatCanvas>
      </div>
      <div className={styles.main}>
        <StatTable
          selectedId={selectedId}
          selectedType={selectedComponentType}
          onSelect={setSelectedId}
        ></StatTable>
      </div>
      <div className={styles.right}>
        {componentConfig ? (
          <StatChart
            selectedId={selectedId}
            selectedType={selectedComponentType}
          ></StatChart>
        ) : (
          <Empty
            description="请选择可统计的组件"
            className={styles.empty}
          ></Empty>
        )}
      </div>
    </>
  );
}

export default function Stat() {
  const { loading } = useQuestionnaireDetail();
  const { pageInfo } = usePageInfo();
  useTitle(`问卷统计 - ${pageInfo.title}`);
  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <StatHeader></StatHeader>
      </div>
      <div className={styles["content-wrapper"]}>
        {loading ? (
          <Loading></Loading>
        ) : (
          <div className={styles.content}>
            <Content data={pageInfo}></Content>
          </div>
        )}
      </div>
    </div>
  );
}
