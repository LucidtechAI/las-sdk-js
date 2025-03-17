import { JSONObject, PaginationOptions, RequestConfig, SortParam } from './common';

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
  PaginationOptions & {
    history?: string;
    status?: ProjectRunStatus[];
    sort?: SortParam<ProjectRun>[];
    createdTimeAfter?: Date;
    createdTimeBefore?: Date;
    updatedTimeAfter?: Date;
    updatedTimeBefore?: Date;
  };
export type GetProjectRunOptions = RequestConfig;
export type CreateProjectRunOptions = RequestConfig & Pick<Partial<ProjectRun>, 'metadata' | 'resourceIds'>;
export type UpdateProjectRunOptions = RequestConfig & Pick<Partial<ProjectRun>, 'metadata' | 'resourceIds'>;
export type DeleteProjectRunOptions = RequestConfig;

export const toListProjectRunsQueryParams = (options?: ListProjectRunsOptions) => {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const params: Record<string, any> = {};

  for (const [key, val] of Object.entries(options)) {
    switch (key) {
      case 'sort':
        {
          const sorting: string[] = [];
          for (const sort of val as SortParam<ProjectRun>[]) {
            sorting.push(`${sort.column}:${sort.order}`);
          }
          params[key] = sorting;
        }
        break;
      case 'createdTimeAfter':
      case 'createdTimeBefore':
      case 'updatedTimeAfter':
      case 'updatedTimeBefore':
        params[key] = val?.toISOString();
        break;
      default:
        params[key] = val;
        break;
    }
  }

  return params;
};
