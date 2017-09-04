import test from 'ava';
import las from '../dist/build';
import config from './config';


global.navigator = () => null;


test('configure', async t => {
    const {username, password, apiKey} = config;
    const future = las.configure(username, password, apiKey);
    t.is(await future, true);
});
