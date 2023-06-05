import { JSONValue, RequestConfig, PaginationOptions } from './common';

export type TrainingInstanceType = 'small-gpu' | 'medium-gpu' | 'large-gpu';

export type TrainingStatus =
  | 'waiting-for-approval'
  | 'pending'
  | 'running'
  | 'running-final-evaluation'
  | 'succeeded'
  | 'failed'
  | 'cancelled';

export type Training = {
  createdBy: string | null;
  createdTime: string | null;
  dataBundleIds: Array<string>;
  dataScientistAssistance: boolean;
  deploymentEnvironmentId: string | null;
  description: string | null;
  evaluation: Record<string, any>;
  gpuHours: number | null;
  instanceType: TrainingInstanceType;
  metadata: Record<string, JSONValue> | null;
  modelId: string;
  name: string | null;
  status: TrainingStatus;
  trainingId: string;
  updatedBy: string | null;
  updatedTime: string | null;
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
