import { getQuestionaireDetail } from "@/api/questionnaire/questionnaire";
import { AppDispatch } from "@/store";
import { resetComponents } from "@/store/reducer/question/component";
import { changePageInfo } from "@/store/reducer/question/page";
import { useRequest } from "ahooks";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

export function useQuestionnaireDetail() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  return useRequest(getQuestionaireDetail, {
    defaultParams: [id!],
    onSuccess(data) {
      dispatch(
        resetComponents({
          componentList: data.componentList.map((r) => {
            return {
              ...r,
              id: r.fe_id,
            };
          }),
          selectedComponentId: data.componentList[0]?.fe_id || "",
          clipboardComponent: null,
        })
      );
      dispatch(
        changePageInfo({
          id: data.id,
          title: data.title,
          desc: data.desc,
          js: data.js,
          css: data.css,
          isPublished: data.isPublished,
        })
      );
    },
  });
}
