# Changelog 

## Version 6.0.2-rc.0 - 2021-12-01

- Refactor packages to use npm workspaces

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
