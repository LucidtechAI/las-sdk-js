import { JSONValue, PaginationOptions, RequestConfig } from './common';
import { PostprocessConfig } from './prediction';

export type PreprocessConfig = {
  autoRotate: boolean;
  imageQuality: 'LOW' | 'HIGH';
  maxPages: number;
};

export type Field = {
  description?: string;
  fields?: FieldConfig;
  enum?: Array<string>;
  maxLength?: number;
  type: 'amount' | 'date' | 'digits' | 'enum' | 'lines' | 'numeric' | 'string';
};

export type FieldConfig = Record<string, Field>;

export type CreateModelOptions = RequestConfig & {
  description?: string;
  name?: string;
  width?: number;
  height?: number;
  postprocessConfig?: PostprocessConfig;
  preprocessConfig?: PreprocessConfig;
  metadata?: Record<string, JSONValue> | null;
};

export type GetModelOptions = RequestConfig;

export type UpdateModelOptions = RequestConfig & {
  description?: string;
  fieldConfig?: FieldConfig;
  height?: number;
  name?: string;
  postprocessConfig?: PostprocessConfig;
  preprocessConfig?: PreprocessConfig;
  width?: number;
  metadata?: Record<string, JSONValue> | null;
  trainingId?: string | null;
};

export type DeleteModelOptions = RequestConfig;

export type Model = {
  createdBy: string | null;
  createdTime: string | null;
  description: string | null;
  fieldConfig: FieldConfig | null;
  height: number;
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
  width: number;
  metadata: Record<string, JSONValue> | null;
};

export type ListModelsOptions = RequestConfig & PaginationOptions;

export type ModelList = {
  models: Array<Model>;
  nextToken: string | null;
};
