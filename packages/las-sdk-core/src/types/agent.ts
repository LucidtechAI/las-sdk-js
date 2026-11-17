import { Alias, JSONObject, JSONValue, PaginationOptions, RequestConfig, SetAliasOptions } from './common';

export type AgentEnvironmentVariable = {
  name: string;
  value: JSONValue;
  description?: string | null;
};

export type AgentEnvironment = {
  id: string;
  name: string;
  variables: AgentEnvironmentVariable[];
};

export type Agent = {
  /* Id */
  id: string;
  /* Qualified with the version (`<id>:3`) on a published version */
  agentId: string;
  /* Attributes */
  createdBy: string;
  createdTime: Date;
  description?: string | null;
  /* The environment the draft runs with */
  draftEnvironmentId?: string | null;
  environments?: AgentEnvironment[];
  metadata: JSONObject;
  name?: string | null;
  /* Set on a published version */
  publishedBy?: string | null;
  publishedTime?: Date | null;
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
export type CreateAgentOptions = RequestConfig & Pick<Partial<Agent>, 'description' | 'metadata' | 'name'>;
export type UpdateAgentOptions = RequestConfig &
  Pick<Partial<Agent>, 'description' | 'metadata' | 'name'> & {
    /* Replaces the agent's environments. An environment without an id is added */
    environments?: Array<Omit<AgentEnvironment, 'id'> & { id?: string }>;
    /* The environment the draft runs with: null clears it */
    draftEnvironmentId?: string | null;
  };
export type DeleteAgentOptions = RequestConfig & {
  /* Also delete the agent's hooks, actions, models and validations */
  deleteResources?: boolean;
};

/* Published versions, newest first: each is the agent as it was published */
export type AgentVersionList = {
  versions: Agent[];
  nextToken?: string | null;
};

export type AgentAlias = Alias & {
  /* Qualified with the version the alias points to */
  agentId: string;
  /* The environment runs of the alias run with */
  environmentId?: string | null;
};

export type AgentAliasList = {
  aliases: AgentAlias[];
};

export type ListAgentVersionsOptions = RequestConfig & PaginationOptions;
export type CreateAgentVersionOptions = RequestConfig;
export type ListAgentAliasesOptions = RequestConfig;
export type GetAgentAliasOptions = RequestConfig;
export type SetAgentAliasOptions = SetAliasOptions & {
  /* The environment runs of the alias run with: null clears it, and leaving it out keeps the alias's */
  environmentId?: string | null;
};
export type DeleteAgentAliasOptions = RequestConfig;

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
