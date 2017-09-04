import test from 'ava';
import las from '../dist/build';
import config from './config';
import 'isomorphic-fetch';


global.navigator = () => null;


test('scan-receipt', async t => {
    const {username, password, apiKey, url} = config;
    await las.configure(username, password, apiKey);

    const withUrlResponse = await las.scanReceiptWithUrl(url);
    withUrlResponse.forEach(detection => {
        t.truthy(detection.label);
        t.truthy(detection.confidence);
        t.truthy(detection.value);
    });

    const file = await fetch(config.url).then(response => {
        return response.buffer();
    });
    const withFileResponse = await las.scanReceiptWithFile(file);
    withFileResponse.forEach(detection => {
        t.truthy(detection.label);
        t.truthy(detection.confidence);
        t.truthy(detection.value);
    });
});
