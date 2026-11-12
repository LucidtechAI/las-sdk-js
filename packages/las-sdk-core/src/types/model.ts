import {
  Alias,
  JSONObject,
  OptionsOmit,
  PaginationOptions,
  PostprocessConfig,
  PreprocessConfig,
  RequestConfig,
  SetAliasOptions,
} from './common';

export type EnumValue = { value: string; description: string };

export const FieldTypeValues = ['single-value', 'multi-value', 'table'] as const;
export type FieldType = (typeof FieldTypeValues)[number];

export const LlmVersionValues = [
  'sonnet-4.0',
  'sonnet-4.5',
  'sonnet-4.6',
  'sonnet-5',
  'sonnet-5.5',
  'haiku-5.5',
  'qwen3-vl',
] as const;
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
  /* Qualified with the version (`<id>:3`) on a published version */
  modelId: string;
  /* Attributes */
  /* The agent it belongs to: set when it's created (agentId on create), it leaves the agent when deleted */
  agentId?: string | null;
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
  /* Set on a published version */
  publishedBy?: string | null;
  publishedTime?: Date | null;
  updatedBy?: string | null;
  updatedTime?: Date | null;
};

export type ModelList = {
  models: Model[];
  nextToken?: string | null;
  /* A batch get's IDs it couldn't return in this response (it was full): request them again */
  unprocessedIds?: string[];
};

export type ListModelsOptions = RequestConfig &
  PaginationOptions & {
    /* Batch get: only these Models (at most 100), in one request. Missing ones are left out of the response */
    modelId?: string | Array<string>;
  };
export type GetModelOptions = RequestConfig;
export type CreateModelOptions = RequestConfig & OptionsOmit<Model, 'modelId'> & Pick<Model, 'fieldConfig'>;
export type UpdateModelOptions = RequestConfig & OptionsOmit<Model, 'modelId' | 'agentId'>;
export type DeleteModelOptions = RequestConfig;

/* Published versions, newest first: each is the model as it was published */
export type ModelVersionList = {
  versions: Model[];
  nextToken?: string | null;
};

export type ModelAlias = Alias & {
  /* Qualified with the version the alias points to */
  modelId: string;
};

export type ModelAliasList = {
  aliases: ModelAlias[];
};

export type ListModelVersionsOptions = RequestConfig & PaginationOptions;
export type CreateModelVersionOptions = RequestConfig;
export type ListModelAliasesOptions = RequestConfig;
export type GetModelAliasOptions = RequestConfig;
export type SetModelAliasOptions = SetAliasOptions;
export type DeleteModelAliasOptions = RequestConfig;
