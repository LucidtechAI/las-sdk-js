import { JSONObject, JSONValue, PaginationOptions, RequestConfig } from './common';
import { PostprocessConfig } from './prediction';

export const ImageQualityValues = ['LOW', 'HIGH'] as const;
export type ImageQuality = (typeof ImageQualityValues)[number];

export type PreprocessConfig = {
  autoRotate: boolean;
  imageQuality: ImageQuality;
  maxPages: number;
};

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
  numberOfDataBundles: number;
  numberOfRunningTrainings: number;
  organizationId: string;
  postprocessConfig: PostprocessConfig;
  preprocessConfig: PreprocessConfig;
  status: ModelStatus;
  trainingId?: string | null;
  updatedBy?: string | null;
  updatedTime?: Date | null;
};

export type CreateModelOptions = RequestConfig & {
  description?: string;
  metadata?: Record<string, JSONValue> | null;
  name?: string;
  postprocessConfig?: PostprocessConfig;
  preprocessConfig?: PreprocessConfig;
};

export type GetModelOptions = RequestConfig;

export type UpdateModelOptions = RequestConfig & {
  description?: string;
  fieldConfig?: FieldConfig;
  metadata?: Record<string, JSONValue> | null;
  name?: string;
  postprocessConfig?: PostprocessConfig;
  preprocessConfig?: PreprocessConfig;
  trainingId?: string | null;
};

export type DeleteModelOptions = RequestConfig;

export type ListModelsOptions = { owner?: Array<string> } & RequestConfig & PaginationOptions;

export type ModelList = {
  models: Array<Model>;
  nextToken: string | null;
};
