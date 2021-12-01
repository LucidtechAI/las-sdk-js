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

Requirements: npm version >=7 (workspaces support)

Install dependencies
```
$ npm install
```

Build
```
$ npm run build
```

Run tests
```
$ npm run test
```

## Development

This repo uses NPM workspaces (npm 7+).

### To locally link packages during development

In repo workspace root:

```
npm link -ws
```

In target project directory, where you want to use locally linked packages:
```
npm link @lucidtech/las-sdk-core @lucidtech/las-sdk-browser @lucidtech/las-sdk-node
```
