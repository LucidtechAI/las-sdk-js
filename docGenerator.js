const fs = require('fs');
const path = require('path')
const {Extractor, ExtractorConfig} = require('@microsoft/api-extractor')
const {ApiModel, ApiPackage} = require('@microsoft/api-extractor-model')

const docTemp = './temp';
const docOut = './doc-report'

if (!fs.existsSync(docTemp)){
    fs.mkdirSync(docTemp);
}

if (!fs.existsSync(docOut)){
  fs.mkdirSync(docOut);
}

const apiExtractorJsonPath = path.join(__dirname, './api-extractor.json');
console.log(apiExtractorJsonPath);

// Load and parse the api-extractor.json file
const extractorConfig = ExtractorConfig.loadFileAndPrepare(apiExtractorJsonPath);

// Invoke API Extractor
const extractorResult = Extractor.invoke(extractorConfig, {
  // Equivalent to the "--local" command-line parameter
  localBuild: true,

  // Equivalent to the "--verbose" command-line parameter
  showVerboseMessages: true
});

if (extractorResult.succeeded) {
  const apiModel = new ApiModel();
  const apiJsonPath = path.join(__dirname, './temp/las-sdk.api.json');
  const apiPackage = apiModel.loadPackage(apiJsonPath);
  for (const member of apiPackage.members) {
    console.log(member);
  }
}


