import React from "react";
import { FileTextOutlined, SettingOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
import PropSetting from "./PropSetting";

export default function RightPanel() {
  const tabsItems = [
    {
      key: "propSetting",
      label: (
        <span>
          <FileTextOutlined></FileTextOutlined>属性设置
        </span>
      ),
      children: <PropSetting />,
    },
    {
      key: "layers",
      label: (
        <span>
          <SettingOutlined></SettingOutlined>页面设置
        </span>
      ),
      children: <span>涂层</span>,
    },
  ];

  return <Tabs defaultActiveKey="componentLib" items={tabsItems}></Tabs>;
}
