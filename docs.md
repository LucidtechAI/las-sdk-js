
<a name="readmemd"></a>

@lucidtech/las-sdk-core / [Exports](#modulesmd)

# JavaScript SDK for Lucidtech AI Services API

## Installation

#### Browser version
```
$ yarn add @lucidtech/las-sdk-browser
$ npm install @lucidtech/las-sdk-browser
```

#### Node version
```
$ yarn add @lucidtech/las-sdk-node
$ npm install @lucidtech/las-sdk-node
```

## Usage

```javascript
import { Client } from '@lucidtech/las-sdk-core';
import { ClientCredentials } from '@lucidtech/las-sdk-node';

const credentials = new ClientCredentials('<apiEndpoint>', '<apiKey>', '<clientId>',  '<clientSecret>', '<authEndpoint>');
const client = new Client(credentials);

const content = '<read image content>'
client.createDocument(content, 'image/jpeg').then(documentResponse => {
    console.log(documentResponse);
}).catch(error => {
    console.log(error);
})
```

## Contributing

Install dependencies
```
$ npm install && npm run upgrade-lucidtech
```

Build
```
$ npm run build
```

Run tests
```
$ npm run test test
```


<a name="classesclientclient-1md"></a>

[@lucidtech/las-sdk-core](#readmemd) / [Exports](#modulesmd) / [client](#modulesclientmd) / Client

# Class: Client

[client](#modulesclientmd).Client

A high-level http client for communicating with the Lucidtech REST API

## Hierarchy

* **Client**

## Table of contents

### Constructors

- [constructor](#constructor)

### Properties

- [credentials](#credentials)

### Methods

- [createAsset](#createasset)
- [createBatch](#createbatch)
- [createDocument](#createdocument)
- [createPrediction](#createprediction)
- [createSecret](#createsecret)
- [createTransition](#createtransition)
- [createUser](#createuser)
- [createWorkflow](#createworkflow)
- [deleteDocuments](#deletedocuments)
- [deleteUser](#deleteuser)
- [deleteWorkflow](#deleteworkflow)
- [deleteWorkflowExecution](#deleteworkflowexecution)
- [executeTransition](#executetransition)
- [executeWorkflow](#executeworkflow)
- [getAsset](#getasset)
- [getDocument](#getdocument)
- [getLog](#getlog)
- [getUser](#getuser)
- [listAssets](#listassets)
- [listDocuments](#listdocuments)
- [listModels](#listmodels)
- [listPredictions](#listpredictions)
- [listSecrets](#listsecrets)
- [listTransitionExecutions](#listtransitionexecutions)
- [listTransitions](#listtransitions)
- [listUsers](#listusers)
- [listWorkflowExecutions](#listworkflowexecutions)
- [listWorkflows](#listworkflows)
- [makeDeleteRequest](#makedeleterequest)
- [makeGetRequest](#makegetrequest)
- [makePatchRequest](#makepatchrequest)
- [makePostRequest](#makepostrequest)
- [updateAsset](#updateasset)
- [updateDocument](#updatedocument)
- [updateSecret](#updatesecret)
- [updateTransition](#updatetransition)
- [updateTransitionExecution](#updatetransitionexecution)
- [updateWorkflow](#updateworkflow)

## Constructors

### constructor

\+ **new Client**(`credentials`: [*Credentials*](#classescredentialscredentials-1md)): [*Client*](#classesclientclient-1md)

#### Parameters:

Name | Type |
------ | ------ |
`credentials` | [*Credentials*](#classescredentialscredentials-1md) |

**Returns:** [*Client*](#classesclientclient-1md)

Defined in: [client.ts:63](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/client.ts#L63)

## Properties

### credentials

• **credentials**: [*Credentials*](#classescredentialscredentials-1md)

Defined in: [client.ts:63](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/client.ts#L63)

## Methods

### createAsset

▸ **createAsset**(`content`: *string*): *Promise*<[*Asset*](#asset)\>

Creates an asset handle, calls the POST /assets endpoint.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`content` | *string* | Content to POST (base64-encoded string | Buffer)   |

**Returns:** *Promise*<[*Asset*](#asset)\>

Asset response from REST API

Defined in: [client.ts:374](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/client.ts#L374)

___

### createBatch

▸ **createBatch**(`options`: [*CreateBatchOptions*](#createbatchoptions)): *Promise*<[*Batch*](#batch)\>

Creates a batch, calls the POST /batches endpoint.

#### Parameters:

Name | Type |
------ | ------ |
`options` | [*CreateBatchOptions*](#createbatchoptions) |

**Returns:** *Promise*<[*Batch*](#batch)\>

Batch response from REST API

Defined in: [client.ts:427](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/client.ts#L427)

___

### createDocument

▸ **createDocument**(`content`: *string* \| *Buffer*, `contentType`: [*ContentType*](#contenttype), `options?`: [*CreateDocumentOptions*](#interfacestypescreatedocumentoptionsmd)): *Promise*<[*LasDocument*](#lasdocument)\>

Creates a document handle, calls the POST /documents endpoint.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`content` | *string* \| *Buffer* | Content to POST (base64 string | Buffer)   |
`contentType` | [*ContentType*](#contenttype) | MIME type for the document handle   |
`options?` | [*CreateDocumentOptions*](#interfacestypescreatedocumentoptionsmd) | - |

**Returns:** *Promise*<[*LasDocument*](#lasdocument)\>

Document response from REST API

Defined in: [client.ts:79](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/client.ts#L79)

___

### createPrediction

▸ **createPrediction**(`documentId`: *string*, `modelId`: *string*, `options?`: [*CreatePredictionsOptions*](#interfacestypescreatepredictionsoptionsmd)): *Promise*<[*PredictionResponse*](#predictionresponse)\>

Create a prediction on a document using specified model, calls the POST /predictions endpoint.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`documentId` | *string* | Id of the document to run inference and create a prediction on   |
`modelId` | *string* | Id of the model to use for inference   |
`options?` | [*CreatePredictionsOptions*](#interfacestypescreatepredictionsoptionsmd) | - |

**Returns:** *Promise*<[*PredictionResponse*](#predictionresponse)\>

Predicion response from REST API

Defined in: [client.ts:347](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/client.ts#L347)

___

### createSecret

▸ **createSecret**(`data`: *Record*<*any*, *any*\>, `options?`: [*CreateSecretOptions*](#interfacestypescreatesecretoptionsmd)): *Promise*<[*Secret*](#secret)\>

Creates an secret handle, calls the POST /secrets endpoint.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | *Record*<*any*, *any*\> | Object containing the data you want to keep secret   |
`options?` | [*CreateSecretOptions*](#interfacestypescreatesecretoptionsmd) | - |

**Returns:** *Promise*<[*Secret*](#secret)\>

Secret response from REST API

Defined in: [client.ts:479](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/client.ts#L479)

___

### createTransition

▸ **createTransition**(`transitionType`: [*TransitionType*](#transitiontype), `options?`: [*CreateTransitionOptions*](#interfacestypescreatetransitionoptionsmd)): *Promise*<[*Transition*](#transition)\>

Creates a transition handle, calls the POST /transitions endpoint.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`transitionType` | [*TransitionType*](#transitiontype) | Type of transition "docker"|"manual"   |
`options?` | [*CreateTransitionOptions*](#interfacestypescreatetransitionoptionsmd) | - |

**Returns:** *Promise*<[*Transition*](#transition)\>

Transition response from REST API

Defined in: [client.ts:151](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/client.ts#L151)

___

### createUser

▸ **createUser**(`email`: *string*): *Promise*<[*User*](#user)\>

Creates a new user, calls the POST /users endpoint.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`email` | *string* | Email to the new user   |

**Returns:** *Promise*<[*User*](#user)\>

User response from REST API

Defined in: [client.ts:437](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/client.ts#L437)

___

### createWorkflow

▸ **createWorkflow**(`name`: *string*, `specification`: [*WorkflowSpecification*](#workflowspecification), `options?`: [*CreateWorkflowOptions*](#createworkflowoptions)): *Promise*<[*Workflow*](#workflow)\>

Creates a new workflow, calls the POST /workflows endpoint.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`name` | *string* | Name of the workflow   |
`specification` | [*WorkflowSpecification*](#workflowspecification) | Specification of the workflow   |
`options?` | [*CreateWorkflowOptions*](#createworkflowoptions) | - |

**Returns:** *Promise*<[*Workflow*](#workflow)\>

Workflow response from REST API

Defined in: [client.ts:244](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/client.ts#L244)

___

### deleteDocuments

▸ **deleteDocuments**(`options?`: [*DeleteDocumentOptions*](#interfacestypesdeletedocumentoptionsmd)): *Promise*<[*LasDocumentList*](#lasdocumentlist)\>

Delete documents with the provided consentId, calls the DELETE /documents endpoint.
Will delete all documents when no consentId is provided.

#### Parameters:

Name | Type |
------ | ------ |
`options?` | [*DeleteDocumentOptions*](#interfacestypesdeletedocumentoptionsmd) |

**Returns:** *Promise*<[*LasDocumentList*](#lasdocumentlist)\>

Documents response from REST API

Defined in: [client.ts:136](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/client.ts#L136)

___

### deleteUser

▸ **deleteUser**(`userId`: *string*): *Promise*<[*User*](#user)\>

Delete the user with the provided user_id, calls the DELETE /users/{userId} endpoint.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`userId` | *string* | Id of the user   |

**Returns:** *Promise*<[*User*](#user)\>

User response from REST API

Defined in: [client.ts:468](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/client.ts#L468)

___

### deleteWorkflow

▸ **deleteWorkflow**(`workflowId`: *string*): *Promise*<[*Workflow*](#workflow)\>

Delete the workflow with the provided workflowId, calls the DELETE /workflows/{workflowId} endpoint.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`workflowId` | *string* | Id of the workflow   |

**Returns:** *Promise*<[*Workflow*](#workflow)\>

Workflow response from REST API

Defined in: [client.ts:278](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/client.ts#L278)

___

### deleteWorkflowExecution

▸ **deleteWorkflowExecution**(`workflowId`: *string*, `executionId`: *string*): *Promise*<[*WorkflowExecution*](#workflowexecution)\>

Deletes the execution with the provided execution_id from workflow_id,
calls the DELETE /workflows/{workflowId}/executions/{executionId} endpoint.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`workflowId` | *string* | Id of the workflow   |
`executionId` | *string* | Id of the execution   |

**Returns:** *Promise*<[*WorkflowExecution*](#workflowexecution)\>

WorkflowExecution response from REST API

Defined in: [client.ts:333](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/client.ts#L333)

___

### executeTransition

▸ **executeTransition**(`transitionId`: *string*): *Promise*<[*TransitionExecution*](#transitionexecution)\>

Start executing a manual transition, calls the POST /transitions/{transitionId}/executions endpoint.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`transitionId` | *string* | Id of the transition   |

**Returns:** *Promise*<[*TransitionExecution*](#transitionexecution)\>

Transition execution response from REST API

Defined in: [client.ts:195](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/client.ts#L195)

___

### executeWorkflow

▸ **executeWorkflow**(`workflowId`: *string*, `input`: *object*): *Promise*<[*WorkflowExecution*](#workflowexecution)\>

Start a workflow execution, calls the POST /workflows/{workflowId}/executions endpoint.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`workflowId` | *string* | Id of the workflow   |
`input` | *object* | Input to the first step of the workflow   |

**Returns:** *Promise*<[*WorkflowExecution*](#workflowexecution)\>

Workflow execution response from REST API

Defined in: [client.ts:299](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/client.ts#L299)

___

### getAsset

▸ **getAsset**(`assetId`: *string*): *Promise*<[*Asset*](#asset)\>

Get asset from the REST API, calls the GET /assets/{assetId} endpoint.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`assetId` | *string* | Id of the asset   |

**Returns:** *Promise*<[*Asset*](#asset)\>

Asset response from REST API

Defined in: [client.ts:396](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/client.ts#L396)

___

### getDocument

▸ **getDocument**(`documentId`: *string*): *Promise*<[*LasDocument*](#lasdocument)\>

Get document from the REST API, calls the GET /documents/{documentId} endpoint.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`documentId` | *string* | Id of the document   |

**Returns:** *Promise*<[*LasDocument*](#lasdocument)\>

Document response from REST API

Defined in: [client.ts:99](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/client.ts#L99)

___

### getLog

▸ **getLog**(`logId`: *string*): *Promise*<[*Log*](#log)\>

Get log, calls the GET /logs/{logId} endpoint.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`logId` | *string* | Id of the log   |

**Returns:** *Promise*<[*Log*](#log)\>

Log response from REST API

Defined in: [client.ts:517](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/client.ts#L517)

___

### getUser

▸ **getUser**(`userId`: *string*): *Promise*<[*User*](#user)\>

Get information about a specific user, calls the GET /users/{user_id} endpoint.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`userId` | *string* | Id of the user   |

**Returns:** *Promise*<[*User*](#user)\>

User response from REST API

Defined in: [client.ts:458](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/client.ts#L458)

___

### listAssets

▸ **listAssets**(`options?`: [*PaginationOptions*](#interfacestypespaginationoptionsmd)): *Promise*<[*AssetList*](#assetlist)\>

List assets available, calls the GET /assets endpoint.

#### Parameters:

Name | Type |
------ | ------ |
`options?` | [*PaginationOptions*](#interfacestypespaginationoptionsmd) |

**Returns:** *Promise*<[*AssetList*](#assetlist)\>

Assets response from REST API without the content of each asset

Defined in: [client.ts:386](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/client.ts#L386)

___

### listDocuments

▸ **listDocuments**(`options?`: [*ListDocumentsOptions*](#listdocumentsoptions)): *Promise*<[*LasDocumentList*](#lasdocumentlist)\>

List documents available for inference, calls the GET /documents endpoint.

#### Parameters:

Name | Type |
------ | ------ |
`options?` | [*ListDocumentsOptions*](#listdocumentsoptions) |

**Returns:** *Promise*<[*LasDocumentList*](#lasdocumentlist)\>

Documents response from REST API

Defined in: [client.ts:112](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/client.ts#L112)

___

### listModels

▸ **listModels**(`options?`: [*PaginationOptions*](#interfacestypespaginationoptionsmd)): *Promise*<[*ModelList*](#modellist)\>

List models available, calls the GET /models endpoint.

#### Parameters:

Name | Type |
------ | ------ |
`options?` | [*PaginationOptions*](#interfacestypespaginationoptionsmd) |

**Returns:** *Promise*<[*ModelList*](#modellist)\>

Models response from the REST API

Defined in: [client.ts:507](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/client.ts#L507)

___

### listPredictions

▸ **listPredictions**(`options?`: [*PaginationOptions*](#interfacestypespaginationoptionsmd)): *Promise*<[*PredictionList*](#predictionlist)\>

#### Parameters:

Name | Type |
------ | ------ |
`options?` | [*PaginationOptions*](#interfacestypespaginationoptionsmd) |

**Returns:** *Promise*<[*PredictionList*](#predictionlist)\>

Defined in: [client.ts:364](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/client.ts#L364)

___

### listSecrets

▸ **listSecrets**(`options?`: [*PaginationOptions*](#interfacestypespaginationoptionsmd)): *Promise*<[*SecretList*](#secretlist)\>

List secrets available, calls the GET /secrets endpoint.

#### Parameters:

Name | Type |
------ | ------ |
`options?` | [*PaginationOptions*](#interfacestypespaginationoptionsmd) |

**Returns:** *Promise*<[*SecretList*](#secretlist)\>

Secrets response from REST API without the username of each secret

Defined in: [client.ts:496](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/client.ts#L496)

___

### listTransitionExecutions

▸ **listTransitionExecutions**(`transitionId`: *string*, `options?`: [*TransitionExecutionListOptions*](#transitionexecutionlistoptions)): *Promise*<[*TransitionExecutionList*](#transitionexecutionlist)\>

List executions in a transition, calls the GET /transitions/{transitionId}/executions endpoint.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`transitionId` | *string* | Id of the transition   |
`options?` | [*TransitionExecutionListOptions*](#transitionexecutionlistoptions) | - |

**Returns:** *Promise*<[*TransitionExecutionList*](#transitionexecutionlist)\>

Transition executions responses from REST API

Defined in: [client.ts:228](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/client.ts#L228)

___

### listTransitions

▸ **listTransitions**(`options?`: [*ListTransitionOptions*](#listtransitionoptions)): *Promise*<[*TransitionList*](#transitionlist)\>

List transitions, calls the GET /transitions endpoint.

#### Parameters:

Name | Type |
------ | ------ |
`options?` | [*ListTransitionOptions*](#listtransitionoptions) |

**Returns:** *Promise*<[*TransitionList*](#transitionlist)\>

Transitions response from REST API

Defined in: [client.ts:174](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/client.ts#L174)

___

### listUsers

▸ **listUsers**(`options?`: [*PaginationOptions*](#interfacestypespaginationoptionsmd)): *Promise*<[*UserList*](#userlist)\>

List users, calls the GET /users endpoint.

#### Parameters:

Name | Type |
------ | ------ |
`options?` | [*PaginationOptions*](#interfacestypespaginationoptionsmd) |

**Returns:** *Promise*<[*UserList*](#userlist)\>

User response from REST API

Defined in: [client.ts:448](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/client.ts#L448)

___

### listWorkflowExecutions

▸ **listWorkflowExecutions**(`workflowId`: *string*, `options?`: [*ListWorkflowExecutionsOptions*](#listworkflowexecutionsoptions)): *Promise*<[*WorkflowExecutionList*](#workflowexecutionlist)\>

List executions in a workflow, calls the GET /workflows/{workflowId}/executions endpoint.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`workflowId` | *string* | Id of the workflow   |
`options?` | [*ListWorkflowExecutionsOptions*](#listworkflowexecutionsoptions) | - |

**Returns:** *Promise*<[*WorkflowExecutionList*](#workflowexecutionlist)\>

Workflow executions responses from REST API

Defined in: [client.ts:318](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/client.ts#L318)

___

### listWorkflows

▸ **listWorkflows**(`options?`: [*PaginationOptions*](#interfacestypespaginationoptionsmd)): *Promise*<[*WorkflowList*](#workflowlist)\>

List workflows, calls the GET /workflows endpoint.

#### Parameters:

Name | Type |
------ | ------ |
`options?` | [*PaginationOptions*](#interfacestypespaginationoptionsmd) |

**Returns:** *Promise*<[*WorkflowList*](#workflowlist)\>

Workflows response from REST API

Defined in: [client.ts:268](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/client.ts#L268)

___

### makeDeleteRequest

▸ **makeDeleteRequest**<T\>(`path`: *string*, `query?`: *any*): *Promise*<T\>

#### Type parameters:

Name |
------ |
`T` |

#### Parameters:

Name | Type |
------ | ------ |
`path` | *string* |
`query?` | *any* |

**Returns:** *Promise*<T\>

Defined in: [client.ts:538](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/client.ts#L538)

___

### makeGetRequest

▸ **makeGetRequest**<T\>(`path`: *string*, `query?`: *any*): *Promise*<T\>

#### Type parameters:

Name |
------ |
`T` |

#### Parameters:

Name | Type |
------ | ------ |
`path` | *string* |
`query?` | *any* |

**Returns:** *Promise*<T\>

Defined in: [client.ts:534](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/client.ts#L534)

___

### makePatchRequest

▸ **makePatchRequest**<T\>(`path`: *string*, `body`: *any*): *Promise*<T\>

#### Type parameters:

Name |
------ |
`T` |

#### Parameters:

Name | Type |
------ | ------ |
`path` | *string* |
`body` | *any* |

**Returns:** *Promise*<T\>

Defined in: [client.ts:546](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/client.ts#L546)

___

### makePostRequest

▸ **makePostRequest**<T\>(`path`: *string*, `body`: *any*): *Promise*<T\>

#### Type parameters:

Name |
------ |
`T` |

#### Parameters:

Name | Type |
------ | ------ |
`path` | *string* |
`body` | *any* |

**Returns:** *Promise*<T\>

Defined in: [client.ts:542](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/client.ts#L542)

___

### updateAsset

▸ **updateAsset**(`assetId`: *string*, `data`: [*UpdateAssetOptions*](#interfacestypesupdateassetoptionsmd)): *Promise*<[*Asset*](#asset)\>

Updates an asset, calls the PATCH /assets/assetId endpoint.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`assetId` | *string* | Id of the asset   |
`data` | [*UpdateAssetOptions*](#interfacestypesupdateassetoptionsmd) | - |

**Returns:** *Promise*<[*Asset*](#asset)\>

Asset response from REST API with content

Defined in: [client.ts:407](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/client.ts#L407)

___

### updateDocument

▸ **updateDocument**(`documentId`: *string*, `data`: [*UpdateDocumentOptions*](#interfacestypesupdatedocumentoptionsmd)): *Promise*<[*LasDocument*](#lasdocument)\>

Post ground truth to the REST API, calls the PATCH /documents/{documentId} endpoint.
Posting ground truth means posting the ground truth data for the particular document.
This enables the API to learn from past mistakes.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`documentId` | *string* | Id of the document   |
`data` | [*UpdateDocumentOptions*](#interfacestypesupdatedocumentoptionsmd) | - |

**Returns:** *Promise*<[*LasDocument*](#lasdocument)\>

Document response from REST API

Defined in: [client.ts:125](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/client.ts#L125)

___

### updateSecret

▸ **updateSecret**(`secretId`: *string*, `data`: [*UpdateSecretOptions*](#interfacestypesupdatesecretoptionsmd)): *Promise*<[*Secret*](#secret)\>

Updates a secret, calls the PATCH /secrets/secretId endpoint.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`secretId` | *string* | Id of the secret   |
`data` | [*UpdateSecretOptions*](#interfacestypesupdatesecretoptionsmd) | - |

**Returns:** *Promise*<[*Secret*](#secret)\>

Defined in: [client.ts:529](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/client.ts#L529)

___

### updateTransition

▸ **updateTransition**(`transitionId`: *string*, `data`: [*UpdateTransitionOptions*](#updatetransitionoptions)): *Promise*<[*Transition*](#transition)\>

Updates a transition, calls the PATCH /transitions/transitionId endpoint.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`transitionId` | *string* | Id of the transition   |
`data` | [*UpdateTransitionOptions*](#updatetransitionoptions) | Transition fields to PATCH   |

**Returns:** *Promise*<[*Transition*](#transition)\>

Transition response from REST API

Defined in: [client.ts:185](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/client.ts#L185)

___

### updateTransitionExecution

▸ **updateTransitionExecution**(`transitionId`: *string*, `executionId`: *string*, `data`: [*UpdateTransitionExecution*](#interfacestypesupdatetransitionexecutionmd)): *Promise*<[*TransitionExecution*](#transitionexecution)\>

Ends the processing of the transition execution, calls the
PATCH /transitions/{transition_id}/executions/{execution_id} endpoint.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`transitionId` | *string* | Id of the transition that performs the execution   |
`executionId` | *string* | Id of the execution to update   |
`data` | [*UpdateTransitionExecution*](#interfacestypesupdatetransitionexecutionmd) | - |

**Returns:** *Promise*<[*TransitionExecution*](#transitionexecution)\>

Transition execution response from REST API

Defined in: [client.ts:210](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/client.ts#L210)

___

### updateWorkflow

▸ **updateWorkflow**(`workflowId`: *string*, `data`: [*UpdateWorkflowOptions*](#interfacestypesupdateworkflowoptionsmd)): *Promise*<[*Workflow*](#workflow)\>

Updates a workflow, calls the PATCH /workflows/workflowId endpoint.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`workflowId` | *string* | Id of the workflow   |
`data` | [*UpdateWorkflowOptions*](#interfacestypesupdateworkflowoptionsmd) | Workflow fields to PATCH   |

**Returns:** *Promise*<[*Workflow*](#workflow)\>

Workflow response from REST API

Defined in: [client.ts:288](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/client.ts#L288)


<a name="classescredentialscredentials-1md"></a>

[@lucidtech/las-sdk-core](#readmemd) / [Exports](#modulesmd) / [credentials](#modulescredentialsmd) / Credentials

# Class: Credentials

[credentials](#modulescredentialsmd).Credentials

Use to fetch and store credentials and to generate/cache an access token

## Hierarchy

* **Credentials**

## Table of contents

### Constructors

- [constructor](#constructor)

### Properties

- [apiEndpoint](#apiendpoint)
- [apiKey](#apikey)

### Methods

- [getAccessToken](#getaccesstoken)

## Constructors

### constructor

\+ **new Credentials**(`apiEndpoint`: *string*, `apiKey`: *string*, `storage?`: [*TokenStorage*](#interfacesstoragetokenstoragemd)<[*Token*](#classescredentialstokenmd)\>): [*Credentials*](#classescredentialscredentials-1md)

#### Parameters:

Name | Type |
------ | ------ |
`apiEndpoint` | *string* |
`apiKey` | *string* |
`storage?` | [*TokenStorage*](#interfacesstoragetokenstoragemd)<[*Token*](#classescredentialstokenmd)\> |

**Returns:** [*Credentials*](#classescredentialscredentials-1md)

Defined in: [credentials.ts:43](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/credentials.ts#L43)

## Properties

### apiEndpoint

• `Readonly` **apiEndpoint**: *string*

Defined in: [credentials.ts:37](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/credentials.ts#L37)

___

### apiKey

• `Readonly` **apiKey**: *string*

Defined in: [credentials.ts:39](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/credentials.ts#L39)

## Methods

### getAccessToken

▸ **getAccessToken**(): *Promise*<*string*\>

Method used to get and cache an access token. Algorithm used:
1. Look for a valid token in memory.
2. Look for a valid token in the storage (if provided);
3. Fetch a new token from server and cache it (both in memory and in storage).

**Returns:** *Promise*<*string*\>

Defined in: [credentials.ts:57](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/credentials.ts#L57)


<a name="classescredentialstokenmd"></a>

[@lucidtech/las-sdk-core](#readmemd) / [Exports](#modulesmd) / [credentials](#modulescredentialsmd) / Token

# Class: Token

[credentials](#modulescredentialsmd).Token

Wrapper class for an AWS Cognito token

## Hierarchy

* **Token**

## Table of contents

### Constructors

- [constructor](#constructor)

### Properties

- [accessToken](#accesstoken)
- [expiration](#expiration)
- [refreshToken](#refreshtoken)

### Methods

- [isValid](#isvalid)

## Constructors

### constructor

\+ **new Token**(`accessToken`: *string*, `expiration`: *number*, `refreshToken?`: *string*): [*Token*](#classescredentialstokenmd)

#### Parameters:

Name | Type |
------ | ------ |
`accessToken` | *string* |
`expiration` | *number* |
`refreshToken?` | *string* |

**Returns:** [*Token*](#classescredentialstokenmd)

Defined in: [credentials.ts:19](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/credentials.ts#L19)

## Properties

### accessToken

• `Readonly` **accessToken**: *string*

Defined in: [credentials.ts:8](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/credentials.ts#L8)

___

### expiration

• `Readonly` **expiration**: *number*

Defined in: [credentials.ts:10](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/credentials.ts#L10)

___

### refreshToken

• `Optional` `Readonly` **refreshToken**: *undefined* \| *string*

Defined in: [credentials.ts:12](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/credentials.ts#L12)

## Methods

### isValid

▸ **isValid**(): *boolean*

Checks if current timestamp is larger than token expiration time

**Returns:** *boolean*

Defined in: [credentials.ts:17](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/credentials.ts#L17)


<a name="interfacesstoragetokenstoragemd"></a>

[@lucidtech/las-sdk-core](#readmemd) / [Exports](#modulesmd) / [storage](#modulesstoragemd) / TokenStorage

# Interface: TokenStorage<T\>

[storage](#modulesstoragemd).TokenStorage

## Type parameters

Name | Type |
------ | ------ |
`T` | [*Token*](#classescredentialstokenmd) |

## Hierarchy

* **TokenStorage**

## Table of contents

### Properties

- [getPersistentToken](#getpersistenttoken)
- [setPersistentToken](#setpersistenttoken)

## Properties

### getPersistentToken

• **getPersistentToken**: () => *null* \| T

Defined in: [storage.ts:5](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/storage.ts#L5)

___

### setPersistentToken

• **setPersistentToken**: (`value`: T) => *void*

Defined in: [storage.ts:6](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/storage.ts#L6)


<a name="interfacestypescreatedocumentoptionsmd"></a>

[@lucidtech/las-sdk-core](#readmemd) / [Exports](#modulesmd) / [types](#modulestypesmd) / CreateDocumentOptions

# Interface: CreateDocumentOptions

[types](#modulestypesmd).CreateDocumentOptions

## Hierarchy

* **CreateDocumentOptions**

## Table of contents

### Properties

- [batchId](#batchid)
- [consentId](#consentid)
- [groundTruth](#groundtruth)

## Properties

### batchId

• `Optional` **batchId**: *undefined* \| *string*

Defined in: [types.ts:23](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/types.ts#L23)

___

### consentId

• `Optional` **consentId**: *undefined* \| *string*

Defined in: [types.ts:22](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/types.ts#L22)

___

### groundTruth

• `Optional` **groundTruth**: *undefined* \| [*GroundTruth*](#groundtruth)[]

Defined in: [types.ts:24](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/types.ts#L24)


<a name="interfacestypescreatepredictionsoptionsmd"></a>

[@lucidtech/las-sdk-core](#readmemd) / [Exports](#modulesmd) / [types](#modulestypesmd) / CreatePredictionsOptions

# Interface: CreatePredictionsOptions

[types](#modulestypesmd).CreatePredictionsOptions

## Hierarchy

* **CreatePredictionsOptions**

## Table of contents

### Properties

- [autoRotate](#autorotate)
- [maxPages](#maxpages)

## Properties

### autoRotate

• `Optional` **autoRotate**: *undefined* \| *boolean*

Defined in: [types.ts:9](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/types.ts#L9)

___

### maxPages

• `Optional` **maxPages**: *undefined* \| *number*

Defined in: [types.ts:8](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/types.ts#L8)


<a name="interfacestypescreatesecretoptionsmd"></a>

[@lucidtech/las-sdk-core](#readmemd) / [Exports](#modulesmd) / [types](#modulestypesmd) / CreateSecretOptions

# Interface: CreateSecretOptions

[types](#modulestypesmd).CreateSecretOptions

## Hierarchy

* **CreateSecretOptions**

## Table of contents

### Properties

- [description](#description)

## Properties

### description

• `Optional` **description**: *undefined* \| *string*

Defined in: [types.ts:246](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/types.ts#L246)


<a name="interfacestypescreatetransitionoptionsmd"></a>

[@lucidtech/las-sdk-core](#readmemd) / [Exports](#modulesmd) / [types](#modulestypesmd) / CreateTransitionOptions

# Interface: CreateTransitionOptions

[types](#modulestypesmd).CreateTransitionOptions

## Hierarchy

* **CreateTransitionOptions**

## Table of contents

### Properties

- [description](#description)
- [inputJsonSchema](#inputjsonschema)
- [name](#name)
- [outputJsonSchema](#outputjsonschema)
- [parameters](#parameters)

## Properties

### description

• `Optional` **description**: *undefined* \| *null* \| *string*

Defined in: [types.ts:59](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/types.ts#L59)

___

### inputJsonSchema

• `Optional` **inputJsonSchema**: *undefined* \| *Record*<*any*, *any*\>

Defined in: [types.ts:57](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/types.ts#L57)

___

### name

• `Optional` **name**: *undefined* \| *null* \| *string*

Defined in: [types.ts:56](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/types.ts#L56)

___

### outputJsonSchema

• `Optional` **outputJsonSchema**: *undefined* \| *Record*<*any*, *any*\>

Defined in: [types.ts:58](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/types.ts#L58)

___

### parameters

• `Optional` **parameters**: *undefined* \| [*CreateTransitionDockerParams*](#createtransitiondockerparams) \| [*CreateTransitionManualParams*](#createtransitionmanualparams)

Defined in: [types.ts:60](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/types.ts#L60)


<a name="interfacestypesdeletedocumentoptionsmd"></a>

[@lucidtech/las-sdk-core](#readmemd) / [Exports](#modulesmd) / [types](#modulestypesmd) / DeleteDocumentOptions

# Interface: DeleteDocumentOptions

[types](#modulestypesmd).DeleteDocumentOptions

## Hierarchy

* **DeleteDocumentOptions**

## Table of contents

### Properties

- [consentId](#consentid)

## Properties

### consentId

• `Optional` **consentId**: *undefined* \| *string* \| *string*[]

Defined in: [types.ts:185](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/types.ts#L185)


<a name="interfacestypespaginationoptionsmd"></a>

[@lucidtech/las-sdk-core](#readmemd) / [Exports](#modulesmd) / [types](#modulestypesmd) / PaginationOptions

# Interface: PaginationOptions

[types](#modulestypesmd).PaginationOptions

## Hierarchy

* **PaginationOptions**

## Table of contents

### Properties

- [maxResults](#maxresults)
- [nextToken](#nexttoken)

## Properties

### maxResults

• `Optional` **maxResults**: *undefined* \| *number*

Defined in: [types.ts:13](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/types.ts#L13)

___

### nextToken

• `Optional` **nextToken**: *undefined* \| *string*

Defined in: [types.ts:14](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/types.ts#L14)


<a name="interfacestypesupdateassetoptionsmd"></a>

[@lucidtech/las-sdk-core](#readmemd) / [Exports](#modulesmd) / [types](#modulestypesmd) / UpdateAssetOptions

# Interface: UpdateAssetOptions

[types](#modulestypesmd).UpdateAssetOptions

## Hierarchy

* **UpdateAssetOptions**

## Table of contents

### Properties

- [content](#content)

## Properties

### content

• `Optional` **content**: *undefined* \| *string* \| *Buffer*

Defined in: [types.ts:304](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/types.ts#L304)


<a name="interfacestypesupdatedocumentoptionsmd"></a>

[@lucidtech/las-sdk-core](#readmemd) / [Exports](#modulesmd) / [types](#modulestypesmd) / UpdateDocumentOptions

# Interface: UpdateDocumentOptions

[types](#modulestypesmd).UpdateDocumentOptions

## Hierarchy

* **UpdateDocumentOptions**

## Table of contents

### Properties

- [groundTruth](#groundtruth)

## Properties

### groundTruth

• `Optional` **groundTruth**: *undefined* \| [*GroundTruth*](#groundtruth)[]

Defined in: [types.ts:28](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/types.ts#L28)


<a name="interfacestypesupdatesecretoptionsmd"></a>

[@lucidtech/las-sdk-core](#readmemd) / [Exports](#modulesmd) / [types](#modulestypesmd) / UpdateSecretOptions

# Interface: UpdateSecretOptions

[types](#modulestypesmd).UpdateSecretOptions

## Hierarchy

* **UpdateSecretOptions**

## Table of contents

### Properties

- [data](#data)
- [description](#description)
- [name](#name)

## Properties

### data

• `Optional` **data**: *undefined* \| *Record*<*any*, *any*\>

Defined in: [types.ts:250](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/types.ts#L250)

___

### description

• `Optional` **description**: *undefined* \| *null* \| *string*

Defined in: [types.ts:251](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/types.ts#L251)

___

### name

• `Optional` **name**: *undefined* \| *null* \| *string*

Defined in: [types.ts:252](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/types.ts#L252)


<a name="interfacestypesupdatetransitionexecutionmd"></a>

[@lucidtech/las-sdk-core](#readmemd) / [Exports](#modulesmd) / [types](#modulestypesmd) / UpdateTransitionExecution

# Interface: UpdateTransitionExecution

[types](#modulestypesmd).UpdateTransitionExecution

## Hierarchy

* **UpdateTransitionExecution**

## Table of contents

### Properties

- [error](#error)
- [output](#output)
- [status](#status)

## Properties

### error

• `Optional` **error**: *undefined* \| { `message`: *string*  }

Defined in: [types.ts:52](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/types.ts#L52)

___

### output

• `Optional` **output**: *undefined* \| *Record*<*any*, *any*\>

Defined in: [types.ts:51](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/types.ts#L51)

___

### status

• **status**: *succeeded* \| *failed* \| *retry* \| *rejected*

Defined in: [types.ts:50](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/types.ts#L50)


<a name="interfacestypesupdateworkflowoptionsmd"></a>

[@lucidtech/las-sdk-core](#readmemd) / [Exports](#modulesmd) / [types](#modulestypesmd) / UpdateWorkflowOptions

# Interface: UpdateWorkflowOptions

[types](#modulestypesmd).UpdateWorkflowOptions

## Hierarchy

* **UpdateWorkflowOptions**

## Table of contents

### Properties

- [description](#description)
- [name](#name)

## Properties

### description

• `Optional` **description**: *undefined* \| *string*

Defined in: [types.ts:151](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/types.ts#L151)

___

### name

• `Optional` **name**: *undefined* \| *string*

Defined in: [types.ts:150](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/types.ts#L150)


<a name="modulesmd"></a>

[@lucidtech/las-sdk-core](#readmemd) / Exports

# @lucidtech/las-sdk-core

## Table of contents

### Modules

- [client](#modulesclientmd)
- [credentials](#modulescredentialsmd)
- [index](#modulesindexmd)
- [storage](#modulesstoragemd)
- [types](#modulestypesmd)


<a name="modulesclientmd"></a>

[@lucidtech/las-sdk-core](#readmemd) / [Exports](#modulesmd) / client

# Module: client

## Table of contents

### References

- [default](#default)

### Classes

- [Client](#classesclientclient-1md)

## References

### default

Renames and exports: [Client](#classesclientclient-1md)


<a name="modulescredentialsmd"></a>

[@lucidtech/las-sdk-core](#readmemd) / [Exports](#modulesmd) / credentials

# Module: credentials

## Table of contents

### Classes

- [Credentials](#classescredentialscredentials-1md)
- [Token](#classescredentialstokenmd)


<a name="modulesindexmd"></a>

[@lucidtech/las-sdk-core](#readmemd) / [Exports](#modulesmd) / index

# Module: index

## Table of contents

### References

- [Client](#client)
- [Credentials](#credentials)
- [Token](#token)
- [TokenStorage](#tokenstorage)

## References

### Client

Re-exports: [Client](#classesclientclient-1md)

___

### Credentials

Re-exports: [Credentials](#classescredentialscredentials-1md)

___

### Token

Re-exports: [Token](#classescredentialstokenmd)

___

### TokenStorage

Re-exports: [TokenStorage](#interfacesstoragetokenstoragemd)


<a name="modulesstoragemd"></a>

[@lucidtech/las-sdk-core](#readmemd) / [Exports](#modulesmd) / storage

# Module: storage

## Table of contents

### Interfaces

- [TokenStorage](#interfacesstoragetokenstoragemd)


<a name="modulestypesmd"></a>

[@lucidtech/las-sdk-core](#readmemd) / [Exports](#modulesmd) / types

# Module: types

## Table of contents

### Interfaces

- [CreateDocumentOptions](#interfacestypescreatedocumentoptionsmd)
- [CreatePredictionsOptions](#interfacestypescreatepredictionsoptionsmd)
- [CreateSecretOptions](#interfacestypescreatesecretoptionsmd)
- [CreateTransitionOptions](#interfacestypescreatetransitionoptionsmd)
- [DeleteDocumentOptions](#interfacestypesdeletedocumentoptionsmd)
- [PaginationOptions](#interfacestypespaginationoptionsmd)
- [UpdateAssetOptions](#interfacestypesupdateassetoptionsmd)
- [UpdateDocumentOptions](#interfacestypesupdatedocumentoptionsmd)
- [UpdateSecretOptions](#interfacestypesupdatesecretoptionsmd)
- [UpdateTransitionExecution](#interfacestypesupdatetransitionexecutionmd)
- [UpdateWorkflowOptions](#interfacestypesupdateworkflowoptionsmd)

### Type aliases

- [Asset](#asset)
- [AssetList](#assetlist)
- [AuthorizationHeaders](#authorizationheaders)
- [AxiosFn](#axiosfn)
- [Batch](#batch)
- [ContentType](#contenttype)
- [CreateBatchOptions](#createbatchoptions)
- [CreateTransitionDockerParams](#createtransitiondockerparams)
- [CreateTransitionManualParams](#createtransitionmanualparams)
- [CreateTransitionParams](#createtransitionparams)
- [CreateWorkflowOptions](#createworkflowoptions)
- [GroundTruth](#groundtruth)
- [LasDocument](#lasdocument)
- [LasDocumentList](#lasdocumentlist)
- [ListAssetsOptions](#listassetsoptions)
- [ListDocumentsOptions](#listdocumentsoptions)
- [ListModelsOptions](#listmodelsoptions)
- [ListPredictionsOptions](#listpredictionsoptions)
- [ListSecretsOptions](#listsecretsoptions)
- [ListTransitionOptions](#listtransitionoptions)
- [ListUsersOptions](#listusersoptions)
- [ListWorkflowExecutionsOptions](#listworkflowexecutionsoptions)
- [ListWorkflowOptions](#listworkflowoptions)
- [Log](#log)
- [Model](#model)
- [ModelList](#modellist)
- [PostPredictions](#postpredictions)
- [Prediction](#prediction)
- [PredictionList](#predictionlist)
- [PredictionResponse](#predictionresponse)
- [Secret](#secret)
- [SecretList](#secretlist)
- [Transition](#transition)
- [TransitionExecution](#transitionexecution)
- [TransitionExecutionList](#transitionexecutionlist)
- [TransitionExecutionListOptions](#transitionexecutionlistoptions)
- [TransitionList](#transitionlist)
- [TransitionType](#transitiontype)
- [UpdateTransitionOptions](#updatetransitionoptions)
- [User](#user)
- [UserList](#userlist)
- [Workflow](#workflow)
- [WorkflowExecution](#workflowexecution)
- [WorkflowExecutionList](#workflowexecutionlist)
- [WorkflowList](#workflowlist)
- [WorkflowSpecification](#workflowspecification)

## Type aliases

### Asset

Ƭ **Asset**: { `assetId`: *string* ; `content?`: *string*  }

#### Type declaration:

Name | Type |
------ | ------ |
`assetId` | *string* |
`content?` | *string* |

Defined in: [types.ts:273](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/types.ts#L273)

___

### AssetList

Ƭ **AssetList**: { `assets`: [*Asset*](#asset)[] ; `nextToken`: *string* \| *null*  }

#### Type declaration:

Name | Type |
------ | ------ |
`assets` | [*Asset*](#asset)[] |
`nextToken` | *string* \| *null* |

Defined in: [types.ts:278](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/types.ts#L278)

___

### AuthorizationHeaders

Ƭ **AuthorizationHeaders**: { `Authorization`: *string* ; `X-Api-Key`: *string*  }

#### Type declaration:

Name | Type |
------ | ------ |
`Authorization` | *string* |
`X-Api-Key` | *string* |

Defined in: [types.ts:315](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/types.ts#L315)

___

### AxiosFn

Ƭ **AxiosFn**: <T, R\>(`url`: *string*, `body?`: *any*, `config?`: AxiosRequestConfig) => *Promise*<R\>

Defined in: [types.ts:320](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/types.ts#L320)

___

### Batch

Ƭ **Batch**: { `batchId`: *string* ; `description`: *string* ; `name`: *string*  }

#### Type declaration:

Name | Type |
------ | ------ |
`batchId` | *string* |
`description` | *string* |
`name` | *string* |

Defined in: [types.ts:214](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/types.ts#L214)

___

### ContentType

Ƭ **ContentType**: *application/pdf* \| *image/jpeg*

Defined in: [types.ts:5](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/types.ts#L5)

___

### CreateBatchOptions

Ƭ **CreateBatchOptions**: { `description?`: *string* ; `name?`: *string*  }

#### Type declaration:

Name | Type |
------ | ------ |
`description?` | *string* |
`name?` | *string* |

Defined in: [types.ts:298](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/types.ts#L298)

___

### CreateTransitionDockerParams

Ƭ **CreateTransitionDockerParams**: { `cpu?`: *256* ; `credentials?`: { `password`: *string* ; `username`: *string*  } ; `environment?`: *object* ; `imageUrl`: *string* ; `memory?`: *512* \| *1024* \| *2048*  }

#### Type declaration:

Name | Type |
------ | ------ |
`cpu?` | *256* |
`credentials?` | { `password`: *string* ; `username`: *string*  } |
`environment?` | *object* |
`imageUrl` | *string* |
`memory?` | *512* \| *1024* \| *2048* |

Defined in: [types.ts:70](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/types.ts#L70)

___

### CreateTransitionManualParams

Ƭ **CreateTransitionManualParams**: { `assets?`: { `jsRemoteComponent?`: *string*  } & *Record*<*string*, *string*\>  }

#### Type declaration:

Name | Type |
------ | ------ |
`assets?` | { `jsRemoteComponent?`: *string*  } & *Record*<*string*, *string*\> |

Defined in: [types.ts:81](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/types.ts#L81)

___

### CreateTransitionParams

Ƭ **CreateTransitionParams**: [*CreateTransitionDockerParams*](#createtransitiondockerparams) \| [*CreateTransitionManualParams*](#createtransitionmanualparams)

Defined in: [types.ts:88](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/types.ts#L88)

___

### CreateWorkflowOptions

Ƭ **CreateWorkflowOptions**: { `description?`: *string* ; `errorConfig?`: { `email`: *string*  }  }

#### Type declaration:

Name | Type |
------ | ------ |
`description?` | *string* |
`errorConfig?` | { `email`: *string*  } |

Defined in: [types.ts:144](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/types.ts#L144)

___

### GroundTruth

Ƭ **GroundTruth**: { `label`: *string* ; `value`: *string* \| *boolean* \| *null*  }

#### Type declaration:

Name | Type | Description |
------ | ------ | ------ |
`label` | *string* | maxLength: 36, minLength: 1, pattern: ^[0-9A-Za-z_]+$   |
`value` | *string* \| *boolean* \| *null* | maxLength: 64, minLength: 1   |

Defined in: [types.ts:177](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/types.ts#L177)

___

### LasDocument

Ƭ **LasDocument**: { `batchId?`: *string* ; `consentId?`: *string* ; `content?`: *string* ; `contentType`: [*ContentType*](#contenttype) ; `documentId`: *string* ; `groundTruth?`: [*GroundTruth*](#groundtruth)[] ; `inferenceTime?`: *number* ; `predictions?`: [*Prediction*](#prediction)[] ; `updated?`: *number*  }

#### Type declaration:

Name | Type | Description |
------ | ------ | ------ |
`batchId?` | *string* | pattern: ^las:batch:[a-f0-9]{32}$   |
`consentId?` | *string* | pattern: ^las:consent:[a-f0-9]{32}$   |
`content?` | *string* | minimum: 1   |
`contentType` | [*ContentType*](#contenttype) | - |
`documentId` | *string* | pattern: ^las:document:[a-f0-9]{32}$   |
`groundTruth?` | [*GroundTruth*](#groundtruth)[] | - |
`inferenceTime?` | *number* | minimum: 0   |
`predictions?` | [*Prediction*](#prediction)[] | - |
`updated?` | *number* | minimum: 1   |

Defined in: [types.ts:255](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/types.ts#L255)

___

### LasDocumentList

Ƭ **LasDocumentList**: { `batchId?`: *string* ; `consentId?`: *string* ; `documents`: [*LasDocument*](#lasdocument)[] ; `nextToken?`: *string*  }

#### Type declaration:

Name | Type |
------ | ------ |
`batchId?` | *string* |
`consentId?` | *string* |
`documents` | [*LasDocument*](#lasdocument)[] |
`nextToken?` | *string* |

Defined in: [types.ts:63](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/types.ts#L63)

___

### ListAssetsOptions

Ƭ **ListAssetsOptions**: [*PaginationOptions*](#interfacestypespaginationoptionsmd)

Defined in: [types.ts:307](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/types.ts#L307)

___

### ListDocumentsOptions

Ƭ **ListDocumentsOptions**: [*PaginationOptions*](#interfacestypespaginationoptionsmd) & { `batchId?`: *string* \| *string*[] ; `consentId?`: *string* \| *string*[]  }

Defined in: [types.ts:31](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/types.ts#L31)

___

### ListModelsOptions

Ƭ **ListModelsOptions**: [*PaginationOptions*](#interfacestypespaginationoptionsmd)

Defined in: [types.ts:291](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/types.ts#L291)

___

### ListPredictionsOptions

Ƭ **ListPredictionsOptions**: [*PaginationOptions*](#interfacestypespaginationoptionsmd)

Defined in: [types.ts:207](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/types.ts#L207)

___

### ListSecretsOptions

Ƭ **ListSecretsOptions**: [*PaginationOptions*](#interfacestypespaginationoptionsmd)

Defined in: [types.ts:238](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/types.ts#L238)

___

### ListTransitionOptions

Ƭ **ListTransitionOptions**: [*PaginationOptions*](#interfacestypespaginationoptionsmd) & { `transitionType?`: *string* \| *string*[]  }

Defined in: [types.ts:17](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/types.ts#L17)

___

### ListUsersOptions

Ƭ **ListUsersOptions**: [*PaginationOptions*](#interfacestypespaginationoptionsmd)

Defined in: [types.ts:225](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/types.ts#L225)

___

### ListWorkflowExecutionsOptions

Ƭ **ListWorkflowExecutionsOptions**: [*PaginationOptions*](#interfacestypespaginationoptionsmd) & { `order?`: *ascending* \| *descending* ; `sortBy?`: *startTime* \| *endTime* ; `status?`: *string* \| *string*[]  }

Defined in: [types.ts:138](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/types.ts#L138)

___

### ListWorkflowOptions

Ƭ **ListWorkflowOptions**: [*PaginationOptions*](#interfacestypespaginationoptionsmd)

Defined in: [types.ts:136](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/types.ts#L136)

___

### Log

Ƭ **Log**: { `events`: *Record*<*any*, *any*\>[] ; `logId`: *string* ; `transitionId?`: *string* \| *null*  }

#### Type declaration:

Name | Type |
------ | ------ |
`events` | *Record*<*any*, *any*\>[] |
`logId` | *string* |
`transitionId?` | *string* \| *null* |

Defined in: [types.ts:309](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/types.ts#L309)

___

### Model

Ƭ **Model**: { `description`: *string* \| *null* ; `height`: *number* ; `modelId`: *string* ; `name`: *string* \| *null* ; `width`: *number*  }

#### Type declaration:

Name | Type |
------ | ------ |
`description` | *string* \| *null* |
`height` | *number* |
`modelId` | *string* |
`name` | *string* \| *null* |
`width` | *number* |

Defined in: [types.ts:283](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/types.ts#L283)

___

### ModelList

Ƭ **ModelList**: { `models`: [*Model*](#model)[] ; `nextToken`: *string* \| *null*  }

#### Type declaration:

Name | Type |
------ | ------ |
`models` | [*Model*](#model)[] |
`nextToken` | *string* \| *null* |

Defined in: [types.ts:293](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/types.ts#L293)

___

### PostPredictions

Ƭ **PostPredictions**: [*CreatePredictionsOptions*](#interfacestypescreatepredictionsoptionsmd) & { `documentId`: *string* ; `modelId`: *string*  }

Defined in: [types.ts:188](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/types.ts#L188)

___

### Prediction

Ƭ **Prediction**: [*GroundTruth*](#groundtruth) & { `confidence`: *number*  }

Defined in: [types.ts:193](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/types.ts#L193)

___

### PredictionList

Ƭ **PredictionList**: { `nextToken`: *string* \| *null* ; `predictions`: [*PredictionResponse*](#predictionresponse)[]  }

#### Type declaration:

Name | Type |
------ | ------ |
`nextToken` | *string* \| *null* |
`predictions` | [*PredictionResponse*](#predictionresponse)[] |

Defined in: [types.ts:209](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/types.ts#L209)

___

### PredictionResponse

Ƭ **PredictionResponse**: { `documentId`: *string* ; `inferenceTime`: *number* ; `modelId`: *string* ; `predictionId`: *string* ; `predictions?`: [*Prediction*](#prediction)[] ; `timestamp`: *number*  }

#### Type declaration:

Name | Type |
------ | ------ |
`documentId` | *string* |
`inferenceTime` | *number* |
`modelId` | *string* |
`predictionId` | *string* |
`predictions?` | [*Prediction*](#prediction)[] |
`timestamp` | *number* |

Defined in: [types.ts:198](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/types.ts#L198)

___

### Secret

Ƭ **Secret**: { `description`: *string* \| *null* ; `name`: *string* \| *null* ; `secredId`: *string*  }

#### Type declaration:

Name | Type |
------ | ------ |
`description` | *string* \| *null* |
`name` | *string* \| *null* |
`secredId` | *string* |

Defined in: [types.ts:232](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/types.ts#L232)

___

### SecretList

Ƭ **SecretList**: { `nextToken?`: *string* \| *null* ; `secrets`: [*Secret*](#secret)[]  }

#### Type declaration:

Name | Type |
------ | ------ |
`nextToken?` | *string* \| *null* |
`secrets` | [*Secret*](#secret)[] |

Defined in: [types.ts:240](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/types.ts#L240)

___

### Transition

Ƭ **Transition**: { `assets?`: *Record*<*string*, *string*\> ; `description`: *string* ; `inputJsonSchema`: *unknown* ; `name`: *string* ; `outputJsonSchema?`: *unknown* ; `transitionId`: *string* ; `transitionType`: [*TransitionType*](#transitiontype)  }

#### Type declaration:

Name | Type |
------ | ------ |
`assets?` | *Record*<*string*, *string*\> |
`description` | *string* |
`inputJsonSchema` | *unknown* |
`name` | *string* |
`outputJsonSchema?` | *unknown* |
`transitionId` | *string* |
`transitionType` | [*TransitionType*](#transitiontype) |

Defined in: [types.ts:99](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/types.ts#L99)

___

### TransitionExecution

Ƭ **TransitionExecution**: { `completedBy`: *string* \| *null* ; `endTime`: *string* \| *null* ; `executionId`: *string* ; `input`: *Record*<*any*, *any*\> ; `startTime`: *string* \| *null* ; `status`: *succeeded* \| *failed* \| *retry* \| *running* \| *rejected* ; `transitionId`: *string*  }

#### Type declaration:

Name | Type |
------ | ------ |
`completedBy` | *string* \| *null* |
`endTime` | *string* \| *null* |
`executionId` | *string* |
`input` | *Record*<*any*, *any*\> |
`startTime` | *string* \| *null* |
`status` | *succeeded* \| *failed* \| *retry* \| *running* \| *rejected* |
`transitionId` | *string* |

Defined in: [types.ts:114](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/types.ts#L114)

___

### TransitionExecutionList

Ƭ **TransitionExecutionList**: { `executions`: [*TransitionExecution*](#transitionexecution)[] ; `nextToken`: *string* \| *null* ; `transitionId`: *string*  }

#### Type declaration:

Name | Type |
------ | ------ |
`executions` | [*TransitionExecution*](#transitionexecution)[] |
`nextToken` | *string* \| *null* |
`transitionId` | *string* |

Defined in: [types.ts:36](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/types.ts#L36)

___

### TransitionExecutionListOptions

Ƭ **TransitionExecutionListOptions**: [*PaginationOptions*](#interfacestypespaginationoptionsmd) & { `executionId?`: *string* \| *string*[] ; `order?`: *ascending* \| *descending* ; `sortBy?`: *startTime* \| *endTime* ; `status?`: *succeeded* \| *failed* \| *retry* \| *running* \| *rejected*  }

Defined in: [types.ts:42](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/types.ts#L42)

___

### TransitionList

Ƭ **TransitionList**: { `nextToken?`: *string* ; `transitions`: [*Transition*](#transition)[]  }

#### Type declaration:

Name | Type |
------ | ------ |
`nextToken?` | *string* |
`transitions` | [*Transition*](#transition)[] |

Defined in: [types.ts:109](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/types.ts#L109)

___

### TransitionType

Ƭ **TransitionType**: *docker* \| *manual*

Defined in: [types.ts:90](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/types.ts#L90)

___

### UpdateTransitionOptions

Ƭ **UpdateTransitionOptions**: { `description?`: *string* ; `inputJsonSchema?`: *Record*<*any*, *any*\> ; `name?`: *string* ; `outputJsonSchema?`: *Record*<*any*, *any*\>  }

#### Type declaration:

Name | Type |
------ | ------ |
`description?` | *string* |
`inputJsonSchema?` | *Record*<*any*, *any*\> |
`name?` | *string* |
`outputJsonSchema?` | *Record*<*any*, *any*\> |

Defined in: [types.ts:92](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/types.ts#L92)

___

### User

Ƭ **User**: { `email`: *string* ; `userId`: *string*  }

#### Type declaration:

Name | Type |
------ | ------ |
`email` | *string* |
`userId` | *string* |

Defined in: [types.ts:220](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/types.ts#L220)

___

### UserList

Ƭ **UserList**: { `nextToken?`: *string* ; `users`: [*User*](#user)[]  }

#### Type declaration:

Name | Type |
------ | ------ |
`nextToken?` | *string* |
`users` | [*User*](#user)[] |

Defined in: [types.ts:227](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/types.ts#L227)

___

### Workflow

Ƭ **Workflow**: { `description?`: *string* ; `name`: *string* ; `workflowId`: *string*  }

#### Type declaration:

Name | Type |
------ | ------ |
`description?` | *string* |
`name` | *string* |
`workflowId` | *string* |

Defined in: [types.ts:130](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/types.ts#L130)

___

### WorkflowExecution

Ƭ **WorkflowExecution**: { `completedBy`: *string*[] ; `endTime`: *string* \| *null* ; `executionId`: *string* ; `input`: *Record*<*any*, *any*\> ; `output`: *Record*<*any*, *any*\> ; `startTime`: *string* \| *null* ; `status?`: *succeeded* \| *failed* \| *running* \| *rejected* ; `transitionExecutions`: *Record*<*string*, *string*[]\> \| *null* ; `workflowId`: *string*  }

#### Type declaration:

Name | Type |
------ | ------ |
`completedBy` | *string*[] |
`endTime` | *string* \| *null* |
`executionId` | *string* |
`input` | *Record*<*any*, *any*\> |
`output` | *Record*<*any*, *any*\> |
`startTime` | *string* \| *null* |
`status?` | *succeeded* \| *failed* \| *running* \| *rejected* |
`transitionExecutions` | *Record*<*string*, *string*[]\> \| *null* |
`workflowId` | *string* |

Defined in: [types.ts:158](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/types.ts#L158)

___

### WorkflowExecutionList

Ƭ **WorkflowExecutionList**: { `executions`: *Required*<[*WorkflowExecution*](#workflowexecution)\>[] ; `nextToken?`: *string* ; `status?`: *succeeded* \| *failed* \| *running* \| *rejected* ; `workflowId`: *string*  }

#### Type declaration:

Name | Type |
------ | ------ |
`executions` | *Required*<[*WorkflowExecution*](#workflowexecution)\>[] |
`nextToken?` | *string* |
`status?` | *succeeded* \| *failed* \| *running* \| *rejected* |
`workflowId` | *string* |

Defined in: [types.ts:170](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/types.ts#L170)

___

### WorkflowList

Ƭ **WorkflowList**: { `workflows`: [*Workflow*](#workflow)[]  }

#### Type declaration:

Name | Type |
------ | ------ |
`workflows` | [*Workflow*](#workflow)[] |

Defined in: [types.ts:154](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/types.ts#L154)

___

### WorkflowSpecification

Ƭ **WorkflowSpecification**: { `definition`: *object* ; `language?`: *ASL* ; `version?`: *1.0.0*  }

#### Type declaration:

Name | Type |
------ | ------ |
`definition` | *object* |
`language?` | *ASL* |
`version?` | *1.0.0* |

Defined in: [types.ts:124](https://github.com/LucidtechAI/las-sdk-js/blob/fd4fff8/packages/las-sdk-core/src/types.ts#L124)
