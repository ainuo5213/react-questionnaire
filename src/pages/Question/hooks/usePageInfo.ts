import { RootState } from "@/store";
import { PageStateType } from "@/store/reducer/question/page";
import { useSelector } from "react-redux";

export default function usePageInfo() {
  const page = useSelector<RootState>(
    (state) => state.page.present
  ) as PageStateType;

  return {
    pageInfo: page,
  };
}
