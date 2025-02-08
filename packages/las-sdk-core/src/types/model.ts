import {
  JSONObject,
  OptionsOmit,
  PaginationOptions,
  PostprocessConfig,
  PreprocessConfig,
  RequestConfig,
} from './common';

export type EnumValue = { value: string; description: string };

export const FieldTypeValues = ['string', 'amount', 'numeric', 'lines', 'date', 'enum'] as const;
export type FieldType = (typeof FieldTypeValues)[number];

export type Field = {
  description?: string | null;
  enum?: EnumValue[] | null;
  fields?: FieldConfig | null;
  formatters?: FieldFormatter[] | null;
  isNullable?: boolean | null;
  multiValue?: boolean | null;
  name: string;
  type: FieldType;
  validators?: FieldValidator[] | null;
};

export type FieldConfig = Record<string, Field>;

export type FieldFormatter = {
  config: JSONObject;
  description: string;
  functionId: string;
  name: string;
};
export type FieldValidator = {
  config: JSONObject;
  description: string;
  functionId: string;
  name: string;
};

export const ModelStatusValues = ['active', 'inactive'] as const;
export type ModelStatus = (typeof ModelStatusValues)[number];

export type Model = {
  /* Id */
  modelId: string;
  /* Attributes */
  createdBy: string;
  createdTime: Date;
  description?: string | null;
  fieldConfig?: FieldConfig | null;
  metadata?: JSONObject | null;
  name?: string | null;
  postprocessConfig: PostprocessConfig;
  preprocessConfig: PreprocessConfig;
  updatedBy?: string | null;
  updatedTime?: Date | null;
};

export type ModelList = {
  models: Model[];
  nextToken?: string | null;
};

export type ListModelsOptions = RequestConfig & PaginationOptions;
export type GetModelOptions = RequestConfig;
export type CreateModelOptions = RequestConfig & OptionsOmit<Model, 'modelId'>;
export type UpdateModelOptions = RequestConfig & OptionsOmit<Model, 'modelId'>;
export type DeleteModelOptions = RequestConfig;
