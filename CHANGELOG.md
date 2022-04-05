# Changelog 

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
