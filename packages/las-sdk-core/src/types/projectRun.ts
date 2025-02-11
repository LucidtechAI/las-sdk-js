import { JSONObject, OrderParam, PaginationOptions, RequestConfig } from './common';

export const ProjectRunStatusValues = ['Ready for review', 'Exported', 'Pending predictions', 'Archived'] as const;
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

export type ListProjectRunsOptions = RequestConfig & PaginationOptions & OrderParam & { sortBy?: keyof ProjectRun };
export type GetProjectRunOptions = RequestConfig;
export type CreateProjectRunOptions = RequestConfig & Pick<Partial<ProjectRun>, 'metadata' | 'resourceIds'>;
export type UpdateProjectRunOptions = RequestConfig & Pick<Partial<ProjectRun>, 'metadata' | 'resourceIds'>;
export type DeleteProjectRunOptions = RequestConfig;
