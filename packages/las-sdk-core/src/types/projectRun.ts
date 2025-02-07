import { JSONValue, PaginationOptions, RequestConfig } from './common';

export const ProjectRunStatusValues = ['Ready for review', 'Exported', 'Pending predictions', 'Archived'] as const;
export type ProjectRunStatus = (typeof ProjectRunStatusValues)[number];

export type ProjectRun = {
  /* Id */
  projectId: string;
  runId: string;
  /* Attributes */
  createdBy: string;
  createdTime: Date;
  updatedBy?: string | null;
  updatedTime?: Date | null;
  resourceIds: string[];
  status: ProjectRunStatus;
};

export type CreateProjectRunOptions = RequestConfig & {
  description?: string;
  metadata?: Record<string, JSONValue> | null;
  name?: string;
};

export type UpdateProjectRunOptions = RequestConfig & {
  description?: string;
  metadata?: Record<string, JSONValue> | null;
  name?: string;
};

export type ProjectRunList = {
  runs: Array<ProjectRun>;
  nextToken: string | null;
};

export type GetProjectRunOptions = RequestConfig;

export type ListProjectRunsOptions = RequestConfig & PaginationOptions;

export type DeleteProjectRunOptions = RequestConfig;
