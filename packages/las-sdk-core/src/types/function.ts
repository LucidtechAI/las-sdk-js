import { JSONValue, PaginationOptions, RequestConfig } from './common';

export const RuntimeValues = ['python', 'nodejs'] as const;
export type Runtime = (typeof RuntimeValues)[number];

export type Function = {
  /* Id */
  functionId: string;
  /* Attributes */
  code: string;
  createdBy: string;
  createdTime: Date;
  description?: string | null;
  name?: string | null;
  runtime: Runtime;
  updatedBy?: string | null;
  updatedTime?: Date | null;
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
