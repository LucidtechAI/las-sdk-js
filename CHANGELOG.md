# Changelog 

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
