import { JSONObject, JSONValue, PaginationOptions, RequestConfig } from './common';

export type Project = {
  /* Id */
  projectId: string;
  /* Attributes */
  createdBy: string;
  createdTime: Date;
  description?: string | null;
  metadata?: JSONObject | null;
  name?: string | null;
  resourceIds: string[];
  updatedBy?: string | null;
  updatedTime?: Date | null;
};

export type CreateProjectOptions = RequestConfig & {
  description?: string;
  metadata?: Record<string, JSONValue> | null;
  name?: string;
};

export type UpdateProjectOptions = RequestConfig & {
  description?: string;
  metadata?: Record<string, JSONValue> | null;
  name?: string;
};

export type ProjectList = {
  projects: Array<Project>;
  nextToken: string | null;
};

export type GetProjectOptions = RequestConfig;

export type ListProjectsOptions = RequestConfig & PaginationOptions;

export type DeleteProjectOptions = RequestConfig;
