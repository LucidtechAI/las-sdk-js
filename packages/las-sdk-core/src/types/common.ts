import type { Axios, AxiosRequestConfig } from 'axios';

export type RequestConfig = { requestConfig?: AxiosRequestConfig };

export type JSONValue = string | number | boolean | { [x: string]: JSONValue } | Array<JSONValue> | null;
export type JSONObject = Record<string, JSONValue>;

export type OptionsOmit<T, K extends keyof T> = Omit<
  Partial<T>,
  K | 'createdBy' | 'createdTime' | 'publishedBy' | 'publishedTime' | 'updatedBy' | 'updatedTime'
>;

export interface PaginationOptions {
  maxResults?: number;
  nextToken?: string;
}

export type AuthorizationHeaders = {
  Authorization: string;
};

export type AxiosFn = Axios['get'] | Axios['post'];

export type AttentionMap = number[][];

export type Annotation = {
  value?: string | null;
  confidence?: number;
  formattedValue?: string | null;
  attentionMap?: AttentionMap;
};

export type HeaderAnnotations = Annotation[];
export type TableAnnotations = Record<string, Annotation[]>[];
export type Annotations = Record<string, HeaderAnnotations | TableAnnotations>;

export const ImageQualityValues = ['LOW', 'HIGH'] as const;
export type ImageQuality = (typeof ImageQualityValues)[number];

export type PreprocessConfig = {
  autoRotate?: boolean;
  imageQuality?: ImageQuality;
  maxPages?: number;
  pages?: number[];
};

export type BestFirst = {
  strategy: 'BEST_FIRST';
};

export type BestNPages = {
  strategy: 'BEST_N_PAGES';
  parameters: {
    n: 1 | 2 | 3;
    collapse?: boolean;
  };
};

export type PostprocessConfig = BestFirst | BestNPages;
export type OwnerParam = { owner?: string | string[] };
export type OrderParam = { order?: 'ascending' | 'descending' };
export type SortParam<T> = {
  column: keyof T;
  order: 'asc' | 'desc';
};

/* An alias's earlier and current versions, oldest first */
export type AliasHistoryEntry = {
  resourceVersion: number;
  environmentId?: string | null;
  updatedBy?: string | null;
  updatedTime?: string | null;
};

/* A name for a version of an agent, a model or a function: `<id>:@<alias>` refers to that version */
export type Alias = {
  alias: string;
  resourceVersion: number;
  history: AliasHistoryEntry[];
  updatedBy?: string | null;
  updatedTime?: Date | null;
};

export type SetAliasOptions = RequestConfig & {
  /* The version the alias points to */
  resourceVersion: number;
};

export const RestoreStatusValues = ['failed', 'running', 'succeeded'] as const;
export type RestoreStatus = (typeof RestoreStatusValues)[number];

/* A Function of restored steps that something outside the restore also uses: those steps were pointed at the
   Function's version instead of having the Function's draft restored in place */
export type RestoreSharedFunction = {
  functionId: string;
  /* The restored steps that use it */
  usedBy: string[];
};

/* The resources a restore changed, or for a dry run would change */
export type RestoreChanges = {
  /* Resources whose settings were replaced by the version's */
  updated: string[];
  /* Resources deleted since the version, brought back */
  undeleted: string[];
  /* Resources of the draft that aren't in the version, and that the agent owned */
  deleted: string[];
  /* Resources of the draft that aren't in the version, taken out of the agent but kept: the agent didn't own them */
  removed: string[];
  sharedFunctions: RestoreSharedFunction[];
};

/* A restore of a published version of an agent, a model or a function into its draft. Restores can't be changed */
export type Restore = {
  /* null for a dry run, which isn't stored */
  restoreId: string | null;
  /* The restored draft */
  resourceId: string;
  /* The version as requested: `<id>:3`, `<id>:@prod` or `<id>:$latest` */
  sourceId: string;
  /* The version sourceId resolved to: `<id>:3` */
  resolvedSourceId: string;
  dryRun: boolean;
  /* null for a dry run */
  status: RestoreStatus | null;
  /* Why it failed */
  error?: string | null;
  changes: RestoreChanges;
  /* null for a dry run */
  createdBy: string | null;
  createdTime: Date | null;
  updatedTime: Date | null;
};

/* Restores, newest first */
export type RestoreList = {
  restores: Restore[];
  nextToken?: string | null;
};

export type CreateRestoreOptions = RequestConfig & {
  /* The version to restore: `<id>:3`, an alias (`<id>:@prod`) or `<id>:$latest` */
  sourceId: string;
  /* Compute what the restore would change, without changing anything or storing the restore */
  dryRun?: boolean;
};
