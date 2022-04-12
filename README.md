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

This repo uses PNpm workspaces.
Requirements: PNpm

To install PNpm:
```
npm -g install pnpm
``` 

Install dependencies
```
pnpm install
```

Build
```
pnpm run build
```

Run tests
```
pnpm run test
```


## Release process

1. Make changes.
2. Run `npm run bump-patch` (bump-minor, or bump-major) to change version according to semantic versioning.
3. Create an entry for changes in CHANGELOG.md under a new version heading.
4. Create pull request
5. Merge pull request into master, then `git pull` from master branch to update local branch.
6. Run `npm run publish-packages`. This will first build then release all packages to NPM, assuming you are logged into npm with required privileges.
