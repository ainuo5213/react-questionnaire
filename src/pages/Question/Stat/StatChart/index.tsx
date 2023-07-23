import React, { useEffect } from "react";
import { getQuestionComponentStat } from "@/api/stat/stat";
import usePageInfo from "../../hooks/usePageInfo";
import { StatChartPropType } from "./types";
import { useRequest } from "ahooks";
import { Typography, Spin } from "antd";
import { getComponentConfigureByComponentType } from "@/components/QuestionComponents";

const { Title } = Typography;

export default function StatPieChart(props: StatChartPropType) {
  const { pageInfo } = usePageInfo();
  const componentConfigure = getComponentConfigureByComponentType(
    props.selectedType
  );

  const {
    loading,
    data = [],
    run,
  } = useRequest(getQuestionComponentStat, {
    manual: true,
  });

  useEffect(() => {
    if (props.selectedId) {
      run(pageInfo.id, props.selectedId);
    }
  }, [props.selectedId]);

  const StatComponent = componentConfigure!.StatComponent!;

  return (
    <div>
      <Title level={3}>图表统计</Title>
      {loading ? (
        <div style={{ textAlign: "center" }}>
          <Spin></Spin>
        </div>
      ) : (
        <StatComponent stat={data}></StatComponent>
      )}
    </div>
  );
}
