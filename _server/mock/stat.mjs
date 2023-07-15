import Mock from "mockjs";
import Reponse from "../model/Response.js";
import componentList from "./componentList.mjs";
const { Random } = Mock;
function getComponentInfo(stat) {
  return componentList.reduce((res, cur) => {
    const { type, fe_id } = cur;
    switch (type) {
      case "questionInput":
      case "questionTextArea":
        stat[fe_id] = Random.ctitle();
        break;
      case "questionRadioGroup":
        stat[fe_id] =
          cur.props.options[
            Random.natural(0, cur.props.options.length - 1)
          ].text;
        break;
      case "questionCheckboxGroup":
        stat[fe_id] = `${cur.props.list[0].text},${cur.props.list[1].text}`;
        break;
      default:
        break;
    }
    return res;
  });
}
function getAnswerStatList({ pageSize, questionnaireId }) {
  return Array.from({ length: pageSize }, (_, i) => {
    const stat = {};
    getComponentInfo(stat);
    return {
      questionnaireId,
      answerId: Random.guid(),
      ...stat,
    };
  });
}
export default [
  {
    url: "/api/stat/:questioniId",
    method: "get",
    response(ctx) {
      const questionnaireId = Boolean(ctx.query.questionnaireId);
      const pageSize = Number(ctx.query.pageSize) || 10;
      const res = getAnswerStatList({ questionnaireId, pageSize });
      return new Reponse({
        total: 120,
        result: res,
      });
    },
  },
];
