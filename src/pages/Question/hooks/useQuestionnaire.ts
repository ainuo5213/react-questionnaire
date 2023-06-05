import { getQuestionaireDetail } from "@/api/questionnaire/questionnaire";
import { AppDispatch } from "@/store";
import { resetComponents } from "@/store/reducer/question/component";
import { useRequest } from "ahooks";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

export function useQuestionnaireDetail() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  return useRequest(getQuestionaireDetail, {
    defaultParams: [id!],
    onSuccess(data) {
      dispatch(resetComponents({ componentList: data.componentList }));
    },
  });
}
