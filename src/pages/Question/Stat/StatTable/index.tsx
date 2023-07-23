import { getQustionStatList } from "@/api/stat/stat";
import { QuestionStatListItem } from "@/api/stat/stat.types";
import { useRequest } from "ahooks";
import { Table } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import useComponentInfo from "../../hooks/useComponentInfo";
import { getComponentConfigureByComponentType } from "@/components/QuestionComponents";

type StatTablePropType = {
  selectedId: string;
  selectedType: string;
  onSelect: (selectedId: string) => void;
};

export default function StatTable(props: StatTablePropType) {
  const params = useParams();
  const id = params.id! as string;
  const [pageParams, setPageParams] = useState<{
    data: QuestionStatListItem[];
    pageNum: number;
    pageSize: number;
    total: number;
  }>({
    data: [],
    pageNum: 1,
    pageSize: 10,
    total: 0,
  });
  const { run, loading } = useRequest(getQustionStatList, {
    manual: true,
    onSuccess(res) {
      setPageParams({
        ...pageParams,
        total: res.total,
        data: res.result,
      });
    },
  });
  useEffect(() => {
    run(id, {
      pageNum: pageParams.pageNum,
      pageSize: pageParams.pageSize,
    });
  }, []);
  const { componentList } = useComponentInfo();
  const columns = useMemo(() => {
    return componentList.map((r) => {
      const componentConfigure = getComponentConfigureByComponentType(r.type);
      return {
        title: componentConfigure?.StatComponent ? (
          <div key={r.fe_id} onClick={() => props.onSelect(r.fe_id)}>
            <span
              style={{
                color: r.fe_id === props.selectedId ? "#1890ff" : "inherit",
                cursor: "pointer",
              }}
            >
              {r.props.title}
            </span>
          </div>
        ) : (
          r.props.title
        ),
        dataIndex: r.fe_id,
      };
    });
  }, [componentList, props.selectedId]);
  return (
    <Table
      rowKey={(q) => q.answerId}
      pagination={{
        pageSize: pageParams.pageSize,
        current: pageParams.pageNum,
        total: pageParams.total,
        onChange: (pageNum: number, pageSize: number) => {
          run(id, {
            pageNum: pageNum,
            pageSize: pageSize,
          });
        },
      }}
      dataSource={pageParams.data}
      loading={loading}
      columns={columns}
    ></Table>
  );
}
