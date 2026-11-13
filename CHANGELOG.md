# Changelog

## Unreleased

- Upgrade Axios to 1.21.0 across the browser, core and Node packages, and the workspace pnpm dependency to 10.34.9,
  to address dependency security advisories; use Axios method signatures for the internal request function type.

- Add `getAgentGraph` and `updateAgentGraph` methods (`GET`/`PATCH /agents/:id/graph`) and the `AgentGraph` types
- Add optional `agentId` to `Action`, `Hook`, `Model` and `Validation`: set on create to make the resource a member of
  that agent; not an update option
- `resourceIds` is no longer a `createAgent` or `updateAgent` option: an agent's `resourceIds` is read-only (the API
  refuses writing it). Create the agent's resources with `agentId` instead; deleting one takes it out of the agent
- Add batch get to `listActions`, `listHooks`, `listModels`, `listValidations` and `listFunctions`: `actionId`,
  `hookId`, `modelId`, `validationId` and `functionId` options (at most 100 IDs per request), and `unprocessedIds` in
  their responses for the IDs to request again
- Add agent, model and function versions: `createAgentVersion`, `createModelVersion` and `createFunctionVersion`
  publish one, and `listAgentVersions`, `listModelVersions` and `listFunctionVersions` list them. A version is the
  resource as published, its ID qualified with the version number, with `publishedBy` and `publishedTime`
- Add aliases: `setAgentAlias`, `setModelAlias` and `setFunctionAlias` (`PUT .../aliases/:alias`) create an alias or
  move it to a version, and `get*Alias`, `list*Aliases` and `delete*Alias`. `setAgentAlias` also takes an
  `environmentId`: `null` clears it, leaving it out keeps the alias's
- `getAgent`, `getModel`, `getFunction`, `createAgentRun` and `getAgentGraph` take qualified IDs: `<id>:3`,
  `<id>:@prod` or `<id>:$latest`
- IDs are encoded in request paths, so an ID naming its organization (`cradl:organization:cradl/cradl:function:...`)
  works. `getFunction` and `getPlan` no longer encode `:`, as the other methods don't
- Add `environments` and `draftEnvironmentId` to `Agent` and `updateAgent` (`null` clears the draft's environment), and
  `agentAlias`, `environmentId` and `triggerId` to `AgentRun`
- Add `deleteResources` to `deleteAgent`: also deletes the agent's hooks, actions, models and validations
- Add `triggerId` to `createAgentRun`. `metadata` and `resourceIds` are no longer `createAgentRun` options, and
  `createAgent` and `updateAgent` only take `name`, `description` and `metadata` (and `updateAgent` the environments):
  the API refuses the rest
- Add `status` to `updateHookRun`, and `ignored` to `HookStatusValues`. `agentRunId` is optional in `createHookRun`
- Add the `ActionRun has Failed`, `ActionRun has Succeeded` and `Email is Received` triggers to `TriggerValues`.
  `createHook` takes the triggers in `CreateHookTriggerValues`, which the API accepts on create
- `LlmVersionValues` are the supported LLM versions: `sonnet-4.6`, `sonnet-5`, `sonnet-5.5` and `qwen3-vl`, which
  `createModel` and `updateModel` take. A model can still have one of `DeprecatedLlmVersionValues` (`sonnet-4.0`,
  `sonnet-4.5` and `haiku-5.5`); `sonnet-3.7` is removed
- Add `documentId` to `listDocuments`, `order` to `listLogs`, and `sortBy` and `order` to `listFunctions`
- Add `name`, `description`, `metadata`, `agentRunId` and `async` to `createPrediction`
- Add `name` and `description` to `User`, `updateUser` and `Validation`, `metadata` to `Organization` and
  `createOrganization`, and `metadata` and `documentRetentionInDays` to `updateOrganization`
- `createAppClient` creates app clients with a secret, and doesn't take `generateSecret`, `callbackUrls`, `loginUrls`,
  `logoutUrls` or `defaultLoginUrl`: they only configured public app clients, a legacy of Cognito

- Fix `listAgentRuns` and `getAgentStatistics` throwing a `TypeError` when called without options
- Fix a `requestConfig` with `headers` dropping the `Authorization` header: its headers are added to it
- Fix `makeFileServerPutRequest` throwing after the upload when called without headers, and writing `data` into the
  options it was given

## Version 14.0.1 - 2023-11-06

- Fix `secretId` typo in `Secret` type
- Add `pages` to `GroundTruthItem`

## Version 14.0.0 - 2023-09-18

- Remove `height` and `width` from all `Model`-related types
- Add optional `owner` query parameter to `listModels` method
- Update `Workflow` type with missing fields
- Make some `Workflow` fields optional
- Remove `avatar`, `email`, `name` from all `User`-related types
- Add `status` to `User`
- Add optional `modelId` query parameter to `listPredictions` method
- Add `getProfile` and `updateProfile` methods

## Version 13.1.1 - 2023-08-24

- Fix missing export of `Role`-related types

## Version 13.1.0 - 2023-08-24

- Add `listRoles` and `getRole` methods
- Add `roleIds` to `User` and `AppClient`
- Add optional `roleIds` to `CreateAppClientOptions`, `UpdateAppClientOptions`, `CreateUserOptions`, and `UpdateUserOptions`

## Version 13.0.0 - 2023-08-10

Update to make use of new file server feature for `LasDocument`:
- BREAKING: `createDocument` now takes in Buffer/ArrayBuffer/Uint8Array
- Fix `getDocument` method to be compatible with new API changes

## Version 12.0.0 - 2023-06-05

- Internal refactor of type structure.
- Add `Profile` type
- Add `ArrayPrediction` type, to narrow down `PredictionResponse` return type
- Update `User`, `Organization`, `UpdateOrganizationOptions` types

## Version 11.1.2 - 2023-03-20

- Add `monthlyNumberOfFieldPredictionsAllowed` to `Organization`

## Version 11.1.1 - 2023-02-16

- Add missing type properties to `CreateTrainingOption`, `Prediction`, `Organization`, `Model`, `ListDeploymentEnvironmentsOptions`, `UpdateTrainingOptions`, and `Plan`
- Export missing types for `las-sdk-browser` package

## Version 11.1.0 - 2022-11-28

- Add `getDeploymentEnvironment`, and `listDeploymentEnvironments` methods
- Add types for deployment environment: `DeploymentEnvironment`, `ListDeploymentEnvironmentsOptions`, `DeploymentEnvironmentStatus`, `DeploymentEnvironmentList`, `GetDeploymentEnvironmentOptions`.
- Add `dataScientistAssistance` to `UpdateTrainingOptions`

## Version 11.0.0 - 2022-09-13

- Add `events`, and `completedTaskLogId` to `WorkflowExecution`
- Add `fromStartTime`, and `toStartTime` to `ListWorkflowExecutionsOptions`
- Remove deprecated `timestamp` on `Prediction`

## Version 10.0.0 - 2022-09-13

- Fix GET and DELETE requests getting `?` appended to URLs, even without any search parameters present.
- Fix `createdTime`, `description`, `name`, and `updatedTime` in `Dataset` to be nullable.
- Remove deprecated `Field` types
- Add new `Field` type `numeric`
- Add `contentMD5` to `LasDocument`
- Add `dataScientistAssistance` to `Training`
- Add `retentionInDays` to `DataBundle`
- Add `contentMD5`, `createdBy`, `createdTime`, `description`, `name`, `updatedBy`, `updatedTime` to `Asset`

## Version 9.1.5 - 2022-06-27

- Fix typo in Training type declaration; `evalution` -> `evaluation`.

## Version 9.1.4 - 2022-06-27

- Add `evaluation` to Training type.

## Version 9.1.3 - 2022-06-17

- Fix issue with reexport of Client, Credentials, Token, and TokenStorage classes

## Version 9.1.2 - 2022-06-17

- Add `postprocessConfig` to `Model` type.
- Add missing `gpuHours` to `Training` type
- Reexport types from `las-sdk-core` in both `las-sdk-node` and `las-sdk-browser`

## Version 9.1.1 - 2022-05-10

- Allow `trainingId` to be `null` in `UpdateModelOptions`.

## Version 9.1.0 - 2022-04-19
- Add methods and types for handling payment methods: `createPaymentMethod`, `updatePaymentMethod`, `listPaymentMethods`, `getPaymentMethod`, and `deletePaymentMethod`.
- Add `paymentMethodId` to `Organization` type.
- Add `paymentMethodId` and `planId` to `UpdateOrganizationOptions`.

## Version 9.0.2 - 2022-04-12
- Allow null value as groundTruth in UpdateDocumentOptions
- Add `sortBy` ('createdTime') and `order` ('ascending' | 'descending') to `ListDocumentOptions` and `ListPredictionsOptions`
- Add `createdBy`, and `createdTime`  to PredictionResponse

## Version 9.0.1 - 2022-04-05
- Fix Prediction type

## Version 9.0.0 - 2022-04-05

Add support for line items.

- Add optional `fields` to FieldConfig type, allowing nesting FieldConfig for line items
- BREAKING: `GroundTruth` type has been renamed to `GroundTruthItem`
- BREAKING: Every occurence of `Array<GroundTruth>` has been made into a new `GroundTruth` type, which is equal to `Array<GroundTruthItem>`

## Version 8.0.1 - 2022-03-30

- Add trainingId to PredictionResponse type
- Add metadata to User type

## Version 8.0.0 - 2022-03-16

- Remove width and height from createModel method parameters
- Add width and height as optional parameters for CreateModelOptions type
- Add new enum Field type in FieldConfig
- Make maxLength and description optional for Field type in FieldConfig 
- Add monthlyNumberOfActiveModelsUsed, monthlyNumberOfFieldPredictionsUsed, and monthlyNumberOfGpuHoursUsed to Organization type
- Add fieldPredictions to Plan type

## Version 7.1.6 - 2022-03-10

- Add optional trainingId to CreatePredictionOptions type. You can now make predictions with a trainingId to test out new trainings.
- Add trainingId to Model type. The trainingId for a model specifies which training is the one that's currently being used when making predictions.
- Add optional trainingId to UpdateModelOptions type.

## Version 7.1.5 - 2022-02-16

- Fix build error in version 7.1.4

## Version 7.1.4 - 2022-02-16

- Add metadata to LasDocument, Model, Dataset, and Training types

## Version 7.1.3 - 2022-02-11

- Added debug messages to AuthorizationCodeCredentials

## Version 7.1.2 - 2022-02-09

- Fixed a bug causing refresh token to be overwritten

## Version 7.1.1 - 2022-01-10

- Add name, and description to LasDocument type, createDocument, and updateDocument methods
- Add retentionInDays, containsPersonallyIdentifiableInformation to updateDataset method

## Version 7.1.0 - 2021-12-10

- Add getPlan, and listPlans method to Client
- Add listTrainings, createTraining, and updateTraining methods to Client
- Add numberOfRunningTrainings to Model
- Add monthlyNumberOfTrainingsAllowed, monthlyNumberOfTrainingsCreated, and planId to Organization
- Add support for AbortController signal for all requests through requestConfig.signal

## Version 7.0.0 - 2021-12-08

- Removed 'training' from Model.status
- Renamed 'ready' to 'succeeded' in DataBundle.status
- Renamed 'processing' to 'running' in DataBundle.status
- Removed status from UpdateModelOptions

## Version 6.0.1 - 2021-11-17

- Add numberOfDataBundles to Model type

## Version 6.0.0 - 2021-11-08

- Add postprocessConfig field to CreatePredictionsOptions type
- Remove deprecated methods createBatch, updateBatch, listBatches, deleteBatch

## Version 5.1.3 - 2021-11-04

- Add retentionInDays field to CreateDatasetOptions type

## Version 5.1.2 - 2021-10-28

- Add documentRetentionInDays field to Organization type

## Version 5.1.1 - 2021-10-21

- Add missing type fields for AppClient, DataBundle, Dataset, Model, and User

## Version 5.1.0 - 2021-10-12

- Add optional retentionInDays parameter to CreateDocumentOptions for createDocument
- Add optional retentionInDays parameter to UpdateDocumentOptions for updateDocument
- Add retentionInDays, createdBy, updatedBy, createdTime, updatedTime to LasDocument type
- Add groundTruthSummary to Dataset type
- Add 'string' and 'digits' to Field type 

## Version 5.0.2 - 2021-09-10

- Add optional appClientId parameter to CreateUserOptions for createUser

## Version 5.0.1 - 2021-09-10

- Fix broken build

## Version 5.0.0 - 2021-09-10

- BREAKING: Removed the need for apiKey
- Updated listTransitionExecution to accept array as status input
- Added updatedTime to AppClient type

## Version 4.5.0 - 2021-08-10

- Added getDataset
- deleteDataset: Wait for numberOfDocuments to be asynchronously updated before attempting to delete dataset

## Version 4.4.1 - 2021-06-30

- Fixed Dataset type properties

## Version 4.4.0 - 2021-06-30

- Added createDataBundle
- Added updateDataBundle
- Added deleteDataBundle
- Added listDataBundles
- Added defaultLoginUrl and loginUrls to updateAppClient options
- Added monthlyNumberOfDataBundlesAllowed, monthlyNumberOfDataBundlesCreated, numberOfDatasetsAllowed and
numberOfDatasetsCreated to Organization
- Added deleteDocument
- Added createDataset
- Added updateDataset
- Added deleteDataset
- Added listDatasets
- Deprecated createBatch
- Deprecated updateBatch
- Deprecated deleteBatch
- Deprecated listBatches

## Version 4.3.1 - 2021-06-17

- Fixed return type of createDocument

## Version 4.3.0 - 2021-06-10

- Added getOrganization
- Added updateOrganization
- Updated Workflow, CreateWorkflowOptions, and UpdateWorkflowOptions types

## Version 4.2.0 - 2021-05-26

- Added deleteAsset
- Added deleteModel

## Version 4.1.0 - 2021-05-21

- Added defaultLoginUrl and loginUrls to AppClient

## Version 4.0.0 - 2021-05-12

- Added createModel
- Added updateModel
- Added getModel
- Added new possible value 'inactive' for status in Model
- Added CreateAppClientOptions type for createAppClient. You may now create app clients for both the code and
client_credentials OAuth2 grant. 
- Added updateAppClient
- Added updateBatch
