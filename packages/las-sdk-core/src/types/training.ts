import { JSONObject, JSONValue, PaginationOptions, RequestConfig } from './common';

export const TrainingInstanceTypeValues = ['small-gpu', 'medium-gpu', 'large-gpu'] as const;
export type TrainingInstanceType = (typeof TrainingInstanceTypeValues)[number];

export const TrainingStatusValues = [
  'waiting-for-approval',
  'pending',
  'running',
  'running-final-evaluation',
  'succeeded',
  'failed',
  'cancelled',
];
export type TrainingStatus = (typeof TrainingStatusValues)[number];

export type Training = {
  /* Id */
  trainingId: string;
  /* Attributes */
  createdBy: string;
  createdTime: Date;
  dataBundleIds: Array<string>;
  dataScientistAssistance: boolean;
  deploymentEnvironmentId?: string | null;
  description?: string | null;
  evaluation: JSONObject;
  gpuHours?: number | null;
  instanceType: TrainingInstanceType;
  metadata?: JSONObject | null;
  modelId: string;
  name?: string | null;
  status: TrainingStatus;
  updatedBy?: string | null;
  updatedTime?: Date | null;
};

export type TrainingList = {
  trainings: Array<Training>;
  nextToken: string | null;
  status: Array<TrainingStatus>;
};

export type ListTrainingsOptions = RequestConfig &
  PaginationOptions & { status?: TrainingStatus | Array<TrainingStatus> };

export type CreateTrainingOption = {
  dataBundleIds: [string, ...string[]];
  dataScientistAssistance?: boolean;
  description?: string | null;
  instanceType?: TrainingInstanceType;
  metadata?: Record<string, JSONValue> | null;
  name?: string | null;
  warmStartConfig?: {
    trainingId: string;
  };
};

export type UpdateTrainingOptions = {
  deploymentEnvironmentId?: string | null;
  description?: string | null;
  metadata?: Record<string, JSONValue> | null;
  name?: string | null;
  status?: 'cancelled';
};
