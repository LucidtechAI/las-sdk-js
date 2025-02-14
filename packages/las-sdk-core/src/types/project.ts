import { JSONObject, OptionsOmit, PaginationOptions, RequestConfig } from './common';

export type Project = {
  /* Id */
  projectId: string;
  /* Attributes */
  createdBy: string;
  createdTime: Date;
  description?: string | null;
  metadata: JSONObject;
  name?: string | null;
  resourceIds: string[];
  updatedBy?: string | null;
  updatedTime?: Date | null;
};

export type ProjectList = {
  projects: Array<Project>;
  nextToken?: string | null;
};

export type ListProjectsOptions = RequestConfig & PaginationOptions;
export type GetProjectOptions = RequestConfig;
export type CreateProjectOptions = RequestConfig & OptionsOmit<Project, 'projectId'>;
export type UpdateProjectOptions = RequestConfig & OptionsOmit<Project, 'projectId'>;
export type DeleteProjectOptions = RequestConfig;
