# JavaScript SDK for Lucidtech AI Services API

## Installation

```
yarn add git+ssh://git@github.com/LucidtechAI/las-sdk-js.git
```

## Usage

```
import las from 'las-sdk-js';

las.configure(...);
las.scanReceiptWithUrl('https://example.com/image.jpeg');
las.scanReceiptWithFile(File(...));
```

## Contributing

Install dependencies
```
sudo apt-get install -y nodejs
npm install -g yarn
yarn
```

Run tests
```
yarn build && yarn test 
```

Build production modules
```
yarn prepublish
```