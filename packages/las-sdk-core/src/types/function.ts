import { JSONObject, OptionsOmit, PaginationOptions, RequestConfig } from './common';

export const RuntimeValues = ['python', 'nodejs'] as const;
export type Runtime = (typeof RuntimeValues)[number];

export type Function = {
  /* Id */
  id: string;
  functionId: string;
  /* Attributes */
  fileUrl: string;
  createdBy: string;
  createdTime: Date;
  description?: string | null;
  metadata: JSONObject;
  name?: string | null;
  runtime: Runtime;
  updatedBy?: string | null;
  updatedTime?: Date | null;
};

export type FunctionList = {
  functions: Function[];
  nextToken?: string | null;
  /* A batch get's IDs it couldn't return in this response (it was full): request them again */
  unprocessedIds?: string[];
};

export type ListFunctionsOptions = RequestConfig &
  PaginationOptions & {
    /* Batch get: only these Functions (at most 100), in one request. Missing ones are left out of the response */
    functionId?: string | Array<string>;
  };
export type GetFunctionOptions = RequestConfig;
export type CreateFunctionOptions = RequestConfig & OptionsOmit<Function, 'functionId'> & Pick<Function, 'runtime'>;
export type UpdateFunctionOptions = RequestConfig & Pick<Partial<Function>, 'description' | 'metadata' | 'name'>;
export type DeleteFunctionOptions = RequestConfig;
