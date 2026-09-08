import {
  JSONObject,
  OptionsOmit,
  PaginationOptions,
  PostprocessConfig,
  PreprocessConfig,
  RequestConfig,
} from './common';

export type EnumValue = { value: string; description: string };

export const FieldTypeValues = ['single-value', 'multi-value', 'table'] as const;
export type FieldType = (typeof FieldTypeValues)[number];

export const LlmVersionValues = ['sonnet-3.7', 'sonnet-4.0', 'sonnet-4.5', 'sonnet-4.6', 'qwen3-vl'] as const;
export type LlmVersion = (typeof LlmVersionValues)[number];

export const ConditionOperatorValues = ['all', 'any', 'none'] as const;
export type ConditionOperator = (typeof ConditionOperatorValues)[number];

export type FieldCondition = {
  id: string;
  name?: string | null;
  fieldId: string;
  functionId: string;
  config?: JSONObject;
  valuesOp?: ConditionOperator;
};

export type FieldConditionGroup = {
  id: string;
  name?: string | null;
  op: ConditionOperator;
  conditions: FieldCondition[];
};

export type ConditionOwner = {
  conditionGroups?: FieldConditionGroup[] | null;
  conditionGroupsOp?: ConditionOperator | null;
};

export type FieldFormatter = ConditionOwner & {
  id: string;
  config: JSONObject;
  description: string;
  functionId: string;
  name?: string | null;
};

export type FieldValidator = ConditionOwner & {
  id: string;
  config: JSONObject;
  description: string;
  functionId: string;
  name?: string | null;
};

export type Field = ConditionOwner & {
  description?: string | null;
  extractWithAI?: boolean | null;
  fields?: FieldConfig | null;
  formatters?: FieldFormatter[] | null;
  hidden?: boolean | null;
  isNullable?: boolean | null;
  name: string;
  order?: number | null;
  processingOrder?: number | null;
  promptHint?: string | null;
  type: FieldType;
  validators?: FieldValidator[] | null;
};

export type FieldConfig = Record<string, Field>;

export type Model = {
  /* Id */
  modelId: string;
  /* Attributes */
  confidenceVersion?: 'v1' | 'v2' | null;
  createdBy: string;
  createdTime: Date;
  description?: string | null;
  fieldConfig: FieldConfig;
  llmVersion?: LlmVersion | null;
  metadata: JSONObject;
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
export type CreateModelOptions = RequestConfig & OptionsOmit<Model, 'modelId'> & Pick<Model, 'fieldConfig'>;
export type UpdateModelOptions = RequestConfig & OptionsOmit<Model, 'modelId'>;
export type DeleteModelOptions = RequestConfig;
