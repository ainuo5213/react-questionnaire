import { COLORS } from "@/constants";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { QuestionCheckboxGroupStatType } from "./type";

export default function StatBarChart(props: QuestionCheckboxGroupStatType) {
  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={props.stat}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="name" fill="#8884d8" label={{ position: "top" }}>
            {props.stat.map((r, i) => {
              return <Cell key={i} fill={COLORS[i % COLORS.length]}></Cell>;
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}
