import { JSONObject, OptionsOmit, PaginationOptions, RequestConfig } from './common';

export const ValidationNotificationTypes = ['email', 'http'] as const;
export type ValidationNotificationType = (typeof ValidationNotificationTypes)[number];

export type ValidationNotification = {
  type?: ValidationNotificationType;
  when?: string;
  enabled?: boolean;
  timezone?: string;
  onValidationTaskCreated?: boolean;
  onValidationTaskCancelled?: boolean;
  onAgentRunFailed?: boolean;

  /* For HTTP notifications */
  url?: string;
  httpMethod?: string;
  headers?: Record<string, string | number | boolean>;
  params?: Record<string, string | number | boolean>;
  hmacSecret?: string;

  /* For Email notifications */
  emails?: string[];
};

export type ValidationConfig = {
  notifications?: Record<string, ValidationNotification>;
};

export type Validation = {
  /* Id */
  id: string;
  validationId: string;
  /* Attributes */
  /* The agent it belongs to: set when it's created (agentId on create), it leaves the agent when deleted */
  agentId?: string | null;
  config: ValidationConfig;
  createdBy: string;
  createdTime: Date;
  enabled: boolean;
  metadata: JSONObject;
  updatedBy?: string | null;
  updatedTime?: Date | null;
};

export type ValidationList = {
  validations: Array<Validation>;
  nextToken: string | null;
};

export type ListValidationsOptions = RequestConfig & PaginationOptions;
export type GetValidationOptions = RequestConfig;
export type CreateValidationOptions = RequestConfig &
  OptionsOmit<Validation, 'validationId'> &
  Pick<Validation, 'config'>;
export type UpdateValidationOptions = RequestConfig & OptionsOmit<Validation, 'validationId' | 'agentId'>;
export type DeleteValidationOptions = RequestConfig;
