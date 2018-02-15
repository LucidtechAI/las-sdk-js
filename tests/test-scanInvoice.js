import test from 'ava';
import las from '../dist/build';
import config from './config';
import 'isomorphic-fetch';


global.navigator = () => null;


test('scan-invoice', async t => {
    const {username, password, apiKey, stage, url} = config;
    await las.login(username, password);
    await las.configure(apiKey, stage);

    const withUrlResponse = await las.scanInvoiceWithUrl(url);
    withUrlResponse.forEach(detection => {
        t.truthy(detection.label);
        t.truthy(detection.confidence);
        t.truthy(detection.value);
    });
});
