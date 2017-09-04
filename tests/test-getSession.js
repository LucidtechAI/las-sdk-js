import test from 'ava';
import las from '../dist/build';
import config from './config';


global.navigator = () => null;


test('session', async t => {
    const {username, password, apiKey} = config;
    await las.configure(username, password, apiKey);

    const session = await las.getSession();
    t.truthy(session.getIdToken().getJwtToken());
    t.truthy(session.getAccessToken().getJwtToken());
    t.truthy(session.getRefreshToken().getToken());
});
