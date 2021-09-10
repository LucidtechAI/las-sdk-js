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
import { readFile } from 'fs/promises'


const fileBuffer = await readFile('...path/file.jpg')

const credentials = new ClientCredentials('<apiEndpoint>', '<clientId>',  '<clientSecret>', '<authEndpoint>');
const client = new Client(credentials);

const documentResponse = await client.createDocument(fileBuffer, 'image/jpeg');
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
