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
import {ClientCredentials} from '@lucidtech/las-sdk-core';
import {Client} from '@lucidtech/las-sdk-node';

const credentials = new ClientCredentials('<apiKey>', '<clientId>',  '<clientSecret>', '<authEndpoint>');
const client = new Client('<apiEndpoint>', credentials);

const content = '<read image content>'
client.postDocuments(content, 'image/jpeg', '<consentId>').then(documentResponse => {
    console.log(documentResponse);
}).catch(error => {
    console.log(error);
})
```

## Contributing

Install dependencies
```
$ yarn && yarn bootstrap && yarn upgrade-lucidtech
```

Build
```
$ yarn build
```

Run tests
```
$ yarn test
```
