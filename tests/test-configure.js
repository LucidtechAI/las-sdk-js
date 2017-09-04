import test from 'ava';
import las from '../dist/build';
import config from './config';


global.navigator = () => null;


test('configure', t => {
    const {apiKey} = config;
    las.configure(apiKey);
    t.is(las.getApiKey(), apiKey);
});
