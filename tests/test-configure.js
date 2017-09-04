import test from 'ava';
import las from '../dist/build';
import config from './config';


global.navigator = () => null;


test('configure', t => {
    const {apiKey, stage} = config;
    las.configure(apiKey, stage);
    t.is(las.getApiKey(), apiKey);
    t.is(las.getStage(), stage);
});
