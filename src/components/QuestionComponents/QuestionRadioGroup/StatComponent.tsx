import React, { useMemo } from "react";
import { COLORS } from "@/constants";
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";
import {
  QuestionRadioGroupStatType,
  QuestionRadioGroupItemStateType,
} from "./type";
import { format } from "@/utils/math";

export default function StatComponent(props: QuestionRadioGroupStatType) {
  const sum = useMemo(() => {
    return props.stat.reduce((res, cur) => {
      res += cur.count;
      return res;
    }, 0);
  }, [props.stat]);

  return (
    <div
      style={{
        width: "100%",
        height: 400,
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            dataKey="count"
            isAnimationActive={false}
            data={props.stat}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label={(r: QuestionRadioGroupItemStateType) =>
              `${r.name}: ${format(r.count / sum, 2)}%`
            }
          >
            {props.stat.map((r, i) => {
              return <Cell key={i} fill={COLORS[i % COLORS.length]}></Cell>;
            })}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
