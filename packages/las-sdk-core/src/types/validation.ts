import { JSONObject, OptionsOmit, PaginationOptions, RequestConfig } from './common';

export type Validation = {
  /* Id */
  validationId: string;
  /* Attributes */
  config: JSONObject;
  createdBy: string;
  createdTime: Date;
  enabled: boolean;
  metadata: JSONObject;
  agentId: string;
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
  Pick<Validation, 'config' | 'agentId'>;
export type UpdateValidationOptions = RequestConfig & OptionsOmit<Validation, 'validationId'>;
export type DeleteValidationOptions = RequestConfig;
