import React from "react";
import { AppstoreAddOutlined, BarsOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
import ComponentLib from "./ComponentLib";

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
      children: <span>涂层</span>,
    },
  ];

  return <Tabs defaultActiveKey="componentLib" items={tabsItems}></Tabs>;
}
