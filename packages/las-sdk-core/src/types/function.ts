import { JSONObject, PaginationOptions, RequestConfig } from './common';

export const RuntimeValues = ['python', 'nodejs'] as const;
export type Runtime = (typeof RuntimeValues)[number];

export type Function = {
  /* Id */
  functionId: string;
  /* Attributes */
  fileUrl: string;
  createdBy: string;
  createdTime: Date;
  description?: string | null;
  metadata?: JSONObject | null;
  name?: string | null;
  runtime: Runtime;
  updatedBy?: string | null;
  updatedTime?: Date | null;
};

export type FunctionList = {
  functions: Function[];
  nextToken?: string | null;
};

export type ListFunctionsOptions = RequestConfig & PaginationOptions;
export type GetFunctionOptions = RequestConfig;
export type CreateFunctionOptions = RequestConfig & Pick<Partial<Function>, 'description' | 'metadata' | 'name'>;
export type UpdateFunctionOptions = RequestConfig & Pick<Partial<Function>, 'description' | 'metadata' | 'name'>;
export type DeleteFunctionOptions = RequestConfig;
