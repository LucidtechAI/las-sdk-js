import { JSONObject, OrderParam, PaginationOptions, RequestConfig } from './common';

export const ProjectRunStatusValues = [
  'Archived',
  'Exported',
  'Pending export',
  'Pending predictions',
  'Ready for review',
  'Review completed',
  'Succeeded predictions',
] as const;
export type ProjectRunStatus = (typeof ProjectRunStatusValues)[number];

export type ProjectRun = {
  /* Id */
  projectId: string;
  runId: string;
  /* Attributes */
  createdBy: string;
  createdTime: Date;
  history: JSONObject[];
  metadata?: JSONObject | null;
  resourceIds: string[];
  status: ProjectRunStatus;
  updatedBy?: string | null;
  updatedTime?: Date | null;
};

export type ProjectRunList = {
  runs: Array<ProjectRun>;
  nextToken?: string | null;
};

export type ListProjectRunsOptions = RequestConfig &
  PaginationOptions &
  OrderParam & { sortBy?: keyof ProjectRun; history?: string; status?: ProjectRunStatus[] };
export type GetProjectRunOptions = RequestConfig;
export type CreateProjectRunOptions = RequestConfig & Pick<Partial<ProjectRun>, 'metadata' | 'resourceIds'>;
export type UpdateProjectRunOptions = RequestConfig & Pick<Partial<ProjectRun>, 'metadata' | 'resourceIds'>;
export type DeleteProjectRunOptions = RequestConfig;
