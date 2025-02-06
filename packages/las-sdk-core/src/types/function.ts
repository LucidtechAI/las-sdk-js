import { JSONValue, PaginationOptions, RequestConfig } from './common';

export type Function = {
  functionId: string;
  code: string;
  createdBy: string;
  createdTime: Date;
  description?: string;
  name?: string;
  runtime: 'python' | 'nodejs';
  updatedBy?: string;
  updatedTime?: Date;
};

export type CreateFunctionOptions = RequestConfig & {
  description?: string;
  metadata?: Record<string, JSONValue> | null;
  name?: string;
};

export type UpdateFunctionOptions = RequestConfig & {
  description?: string;
  metadata?: Record<string, JSONValue> | null;
  name?: string;
};

export type FunctionList = {
  functions: Array<Function>;
  nextToken: string | null;
};

export type GetFunctionOptions = RequestConfig;

export type ListFunctionsOptions = RequestConfig & PaginationOptions;

export type DeleteFunctionOptions = RequestConfig;
