import { JSONObject, OptionsOmit, PaginationOptions, RequestConfig } from './common';

export type Agent = {
  /* Id */
  agentId: string;
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

export type AgentList = {
  agents: Array<Agent>;
  nextToken?: string | null;
};

export type ListAgentsOptions = RequestConfig & PaginationOptions;
export type GetAgentOptions = RequestConfig;
export type CreateAgentOptions = RequestConfig & OptionsOmit<Agent, 'agentId'>;
export type UpdateAgentOptions = RequestConfig & OptionsOmit<Agent, 'agentId'>;
export type DeleteAgentOptions = RequestConfig;
