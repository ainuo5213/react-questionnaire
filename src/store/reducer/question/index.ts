import componentReducer from "./component";
import pageReducer from "./page";
import undoable, { excludeAction } from "redux-undo";

export default {
  component: undoable(componentReducer, {
    limit: 20,
    filter: excludeAction([
      "component/resetComponents",
      "component/changeSelectedComponentId",
    ]),
  }),
  page: undoable(pageReducer, {
    limit: 20,
  }),
};
