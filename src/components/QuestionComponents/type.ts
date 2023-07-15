import { ComponentPropType } from ".";

export type QuestionPropEvent = {
  onChange?: (newProps: ComponentPropType) => void;
  disabled?: boolean;
};

export type Formmiable = {
  isFormItem: boolean;
};
