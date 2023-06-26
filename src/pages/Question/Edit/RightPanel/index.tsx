import React, { useEffect, useState } from "react";
import { FileTextOutlined, SettingOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
import PropSetting from "./PropSetting";
import PageSetting from "./PageSetting";
import useComponentInfo from "../../hooks/useComponentInfo";

enum TabKeys {
  propSetting = "propSetting",
  pageSetting = "pageSetting",
}

export default function RightPanel() {
  const [activeKey, setActiveKey] = useState(TabKeys.pageSetting);
  const tabsItems = [
    {
      key: TabKeys.propSetting,
      label: (
        <span>
          <FileTextOutlined></FileTextOutlined>属性设置
        </span>
      ),
      children: <PropSetting />,
    },
    {
      key: TabKeys.pageSetting,
      label: (
        <span>
          <SettingOutlined></SettingOutlined>页面设置
        </span>
      ),
      children: <PageSetting></PageSetting>,
    },
  ];

  const { selectedComponentId } = useComponentInfo();

  useEffect(() => {
    if (selectedComponentId) {
      setActiveKey(TabKeys.propSetting);
    } else {
      setActiveKey(TabKeys.pageSetting);
    }
  }, [selectedComponentId]);

  function onTabChange(activeKey: string) {
    setActiveKey(activeKey as TabKeys);
  }

  return (
    <Tabs activeKey={activeKey} items={tabsItems} onChange={onTabChange}></Tabs>
  );
}
