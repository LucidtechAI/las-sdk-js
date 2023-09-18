import { JSONValue, PaginationOptions, RequestConfig } from './common';
import { PostprocessConfig } from './prediction';

export type PreprocessConfig = {
  autoRotate: boolean;
  imageQuality: 'LOW' | 'HIGH';
  maxPages: number;
};

export type Field = {
  description?: string;
  enum?: Array<string>;
  fields?: FieldConfig;
  type: 'amount' | 'date' | 'digits' | 'enum' | 'lines' | 'numeric' | 'string';
};

export type FieldConfig = Record<string, Field>;

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

export type Model = {
  createdBy: string | null;
  createdTime: string | null;
  description: string | null;
  fieldConfig: FieldConfig | null;
  metadata: Record<string, JSONValue> | null;
  modelId: string;
  name: string | null;
  numberOfDataBundles: number;
  numberOfRunningTrainings: number;
  organizationId: string;
  postprocessConfig: PostprocessConfig;
  preprocessConfig: PreprocessConfig;
  status: 'active' | 'inactive';
  trainingId: string | null;
  updatedBy: string | null;
  updatedTime: string | null;
};

export type ListModelsOptions = { owner?: Array<string> } & RequestConfig & PaginationOptions;

export type ModelList = {
  models: Array<Model>;
  nextToken: string | null;
};
