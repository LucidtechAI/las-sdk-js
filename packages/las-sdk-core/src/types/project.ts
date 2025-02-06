import { JSONValue, PaginationOptions, RequestConfig } from './common';

export type Project = {
  createdBy: string | null;
  createdTime: string | null;
  description: string | null;
  metadata: Record<string, JSONValue> | null;
  name: string | null;
  projectId: string;
  updatedBy: string | null;
  updatedTime: string | null;
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
