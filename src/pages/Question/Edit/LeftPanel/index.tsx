import React from "react";
import { AppstoreAddOutlined, BarsOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
import ComponentLib from "./ComponentLib";
import Layer from "./Layer";

export default function LeftPanel() {
  const tabsItems = [
    {
      key: "componentLib",
      label: (
        <span>
          <AppstoreAddOutlined></AppstoreAddOutlined>组件库
        </span>
      ),
      children: <ComponentLib />,
    },
    {
      key: "layers",
      label: (
        <span>
          <BarsOutlined></BarsOutlined>涂层
        </span>
      ),
      children: <Layer></Layer>,
    },
  ];

  return <Tabs defaultActiveKey="componentLib" items={tabsItems}></Tabs>;
}
