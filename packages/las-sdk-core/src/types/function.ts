import {
  Alias,
  JSONObject,
  OptionsOmit,
  OrderParam,
  PaginationOptions,
  RequestConfig,
  SetAliasOptions,
} from './common';

export const RuntimeValues = ['python', 'nodejs'] as const;
export type Runtime = (typeof RuntimeValues)[number];

export type Function = {
  /* Id */
  id: string;
  /* Qualified with the version (`<id>:3`) on a published version */
  functionId: string;
  /* Attributes */
  fileUrl: string;
  createdBy: string;
  createdTime: Date;
  description?: string | null;
  metadata: JSONObject;
  name?: string | null;
  /* Set on a published version */
  publishedBy?: string | null;
  publishedTime?: Date | null;
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
  PaginationOptions &
  OrderParam & {
    /* Batch get: only these Functions (at most 100), in one request. Missing ones are left out of the response */
    functionId?: string | Array<string>;
    sortBy?: 'createdTime';
  };
export type GetFunctionOptions = RequestConfig;
export type CreateFunctionOptions = RequestConfig & OptionsOmit<Function, 'functionId'> & Pick<Function, 'runtime'>;
export type UpdateFunctionOptions = RequestConfig & Pick<Partial<Function>, 'description' | 'metadata' | 'name'>;
export type DeleteFunctionOptions = RequestConfig;

/* Published versions, newest first: each is the function as it was published */
export type FunctionVersionList = {
  versions: Function[];
  nextToken?: string | null;
};

export type FunctionAlias = Alias & {
  /* Qualified with the version the alias points to */
  functionId: string;
};

export type FunctionAliasList = {
  aliases: FunctionAlias[];
};

export type ListFunctionVersionsOptions = RequestConfig & PaginationOptions;
export type CreateFunctionVersionOptions = RequestConfig;
export type ListFunctionAliasesOptions = RequestConfig;
export type GetFunctionAliasOptions = RequestConfig;
export type SetFunctionAliasOptions = SetAliasOptions;
export type DeleteFunctionAliasOptions = RequestConfig;
