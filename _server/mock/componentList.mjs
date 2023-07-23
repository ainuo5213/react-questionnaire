import Mock from "mockjs";
const { Random } = Mock;

export default [
  {
    fe_id: "c1",
    type: "questionTitle",
    isHidden: false,
    isLocked: false,
    title: "个人信息调研",
    props: {
      text: "个人信息调研",
      level: 1,
      isCenter: false,
    },
  },
  {
    fe_id: "c2",
    type: "questionInput",
    isHidden: false,
    isLocked: false,
    title: "输入框",
    props: {
      title: "输入框",
      placeholder: "请输入你的姓名",
    },
  },
  {
    fe_id: "c3",
    type: "questionInput",
    isHidden: false,
    isLocked: false,
    title: "输入框2",
    props: {
      title: "输入框2",
      placeholder: "请输入你的电话",
    },
  },
  {
    fe_id: "c4",
    type: "questionParagraph",
    isHidden: false,
    isLocked: false,
    title: "这是一行段落",
    props: {
      text: "这是一行段落\ntest",
      isCenter: true,
    },
  },
  {
    fe_id: "c5",
    type: "questionTextArea",
    isHidden: false,
    isLocked: false,
    title: "多行输入",
    props: {
      title: "多行输入",
      placeholder: "请输入...",
    },
  },
  {
    fe_id: "c6",
    type: "questionRadioGroup",
    isHidden: false,
    isLocked: false,
    title: "单选按钮组",
    props: {
      title: "性别",
      isVertical: false,
      options: [
        { value: "男", text: "男" },
        { value: "女", text: "女" },
      ],
      value: "",
    },
  },
];
