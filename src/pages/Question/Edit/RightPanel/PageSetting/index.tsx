import usePageInfo from "@/pages/Question/hooks/usePageInfo";
import { AppDispatch } from "@/store";
import { changePageInfo } from "@/store/reducer/question/page";
import { Editor } from "@monaco-editor/react";
import { Form, Input, InputRef, Modal } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

type FormItemPropType = {
  value: string;
  title: string;
  language: string;
  formItem: {
    placeholder: string;
    label: string;
    name: string;
  };
  changeValue: (value: string) => void;
};

function TextAreaFormItem(props: FormItemPropType) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState(props.value);

  function handleFocus() {
    setIsModalOpen(true);
    inputRef.current?.blur();
  }
  function handleModalOk() {
    props.changeValue(value);
    setValue(value);
    setIsModalOpen(false);
  }
  function handleModalCancel() {
    setIsModalOpen(false);
    setValue(props.value);
  }
  function handleValueChange(value: string | undefined) {
    setValue(value || "");
  }
  const inputRef = useRef<InputRef | null>(null);
  return (
    <>
      <Form.Item label={props.formItem.label} name={props.formItem.name}>
        <Input.TextArea
          placeholder={props.formItem.placeholder}
          rows={3}
          onFocus={handleFocus}
          ref={inputRef}
        ></Input.TextArea>
      </Form.Item>
      <Modal
        title={props.title}
        open={isModalOpen}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Editor
          height="400px"
          language={props.language}
          value={value}
          onChange={handleValueChange}
        ></Editor>
      </Modal>
    </>
  );
}

export default function PageSetting() {
  const { pageInfo } = usePageInfo();
  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();
  function handleValueChange() {
    const formValue = form.getFieldsValue();
    dispatch(changePageInfo(formValue));
  }
  useEffect(() => {
    form.setFieldsValue(pageInfo);
  }, [pageInfo]);

  function handleJsValueChange(value: string) {
    form.setFieldValue("js", value);
    dispatch(changePageInfo(form.getFieldsValue()));
  }

  function handleCssValueChange(value: string) {
    form.setFieldValue("css", value);
    dispatch(changePageInfo(form.getFieldsValue()));
  }

  return (
    <>
      <Form
        layout="vertical"
        initialValues={pageInfo}
        onValuesChange={handleValueChange}
        form={form}
      >
        <Form.Item
          label="问卷标题"
          name="title"
          rules={[{ required: true, message: "请输入问卷标题" }]}
        >
          <Input placeholder="请输入问卷标题"></Input>
        </Form.Item>
        <Form.Item label="问卷描述" name="title">
          <Input.TextArea
            placeholder="请输入问卷描述"
            rows={3}
          ></Input.TextArea>
        </Form.Item>
        <TextAreaFormItem
          value={pageInfo.css || ""}
          formItem={{
            name: "css",
            label: "样式代码",
            placeholder: "请输入样式代码",
          }}
          language="css"
          changeValue={handleCssValueChange}
          title="设置样式代码"
        />
        <TextAreaFormItem
          value={pageInfo.js || ""}
          formItem={{
            name: "js",
            label: "脚本代码",
            placeholder: "请输入脚本代码",
          }}
          language="javascript"
          changeValue={handleJsValueChange}
          title="设置脚本代码"
        />
      </Form>
    </>
  );
}
