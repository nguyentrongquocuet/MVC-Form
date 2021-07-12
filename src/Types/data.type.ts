export interface MultiForm {
  id: string;
  title: LocaleText;
  type: TypeofMultiForm;
  steps: Step[];
  fields: Record<string, Field>;
  settings: MultiFormSettings;
}

export type TypeofMultiForm = "multi";

export type TypeofSingleForm = "single";

export type TypeofForm = TypeofMultiForm | TypeofSingleForm;

export type TypeofField =
  | "date"
  | "checkbox"
  | "textarea"
  | "dropdown"
  | "email"
  | "radio"
  | "number"
  | "fileUpload"
  | "text";

export interface Option {
  label: LocaleText;
  value: string;
  id: string;
}

export interface Step {
  id: string;
  fieldIdList: string[];
  settings: StepSettings;
  title: LocaleText;
}

export interface StepSettings {
  allowSkip: boolean;
  allowPrev: boolean;
}

export type FormFieldMap = Record<string, Field>;

export interface SingleForm {
  id: string;
  title: LocaleText;
  type: string;
  fieldIdList: string[];
  fields: FormFieldMap;
  settings: SingleFormSettings;
}

export interface Field {
  id: string;
  label: LocaleText;
  advance: FieldAdvanced;
  type: TypeofField;
  placeholder: LocaleText;
  height: string;
  width: string;
  options: Option[];
  multiple: boolean;
  validation: {
    [k in ValidatorNames]: boolean;
  };
  defaultValue: any;
}

export type ValidatorNames = "required" | "minLen" | "maxLen" | "min" | "max";

export interface FieldAdvanced {
  helpText: LocaleText;
  hideLabel: boolean;
  wrapperClass: string;
  elementClass: string;
  labelClass: string;
}

export interface SingleFormSettings {
  form: {
    title: LocaleText;
    className: string;
    successMessage: LocaleText;
    errorMessage: LocaleText;
    submitButton: ButtonStyle;
    fontColor: string;
    backgroundColor: string;
  };
}

export interface MultiFormSettings {
  form: {
    title: LocaleText;
    className: string;
    successMessage: LocaleText;
    errorMessage: LocaleText;
    submitButton: ButtonStyle;
    skipButton: ButtonStyle;
    prevButton: ButtonStyle;
    nextButton: ButtonStyle;
    fontColor: string;
    backgroundColor: string;
  };
}

export interface ButtonStyle {
  text: LocaleText;
  className: string;
}

export type LocaleText = Record<string, string>;
