import { COLORS } from "@/constants";
import { Typography } from "antd";
import React from "react";
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";

const data01 = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
  { name: "Group E", value: 278 },
  { name: "Group F", value: 189 },
];

const { Title } = Typography;
type StatChartPropType = {
  selectedId: string;
  selectedType: string;
};
export default function StatChart(props: StatChartPropType) {
  return (
    <div>
      <Title level={3}>图表统计</Title>
      <div
        style={{
          width: "100%",
          height: 400,
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={400} height={400}>
            <Pie
              dataKey="value"
              isAnimationActive={false}
              data={data01}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label={(r) => `${r.name}: ${r.value}`}
            >
              {data01.map((r, i) => {
                return <Cell key={i} fill={COLORS[i % COLORS.length]}></Cell>;
              })}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
