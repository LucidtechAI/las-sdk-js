import { JSONObject, OptionsOmit, PaginationOptions, RequestConfig } from './common';

export type Agent = {
  /* Id */
  id: string;
  agentId: string;
  /* Attributes */
  createdBy: string;
  createdTime: Date;
  description?: string | null;
  metadata: JSONObject;
  name?: string | null;
  resourceIds: string[];
  status: 'active' | 'inactive';
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

/* GET /agents/:id/graph: the agent's resources and how they connect */
export type AgentGraphNodeType = 'action' | 'function' | 'hook' | 'model' | 'validation';

export type AgentGraphNode = {
  /* The resource's ID */
  id: string;
  type: AgentGraphNodeType;
  name?: string | null;
  /* Whether it belongs to the agent; other nodes are resources its members use (e.g. a public Function) */
  isMember: boolean;
  /* Actions and Hooks */
  functionId?: string | null;
  /* Hooks */
  trigger?: string;
};

export type AgentGraphEdgeKind =
  | 'event'
  | 'trueAction'
  | 'falseAction'
  | 'functionId'
  | 'modelId'
  | 'validationId'
  | 'formatter'
  | 'validator'
  | 'condition';

export type AgentGraphEdge = {
  from: string;
  to: string;
  kind: AgentGraphEdgeKind;
  /* The version or alias the reference names, when it names one */
  qualifier?: string;
};

export type AgentGraphPosition = { x: number; y: number };

/* A position for every node: where it was moved to, else computed */
export type AgentGraphLayout = Record<string, AgentGraphPosition>;

export type AgentGraph = {
  agentId: string;
  nodes: AgentGraphNode[];
  edges: AgentGraphEdge[];
  layout: AgentGraphLayout;
};

export type GetAgentGraphOptions = RequestConfig;
export type UpdateAgentGraphOptions = RequestConfig & {
  /* Positions of moved nodes; null puts a node back at its computed position. Other nodes keep theirs */
  layout: Record<string, AgentGraphPosition | null>;
};
