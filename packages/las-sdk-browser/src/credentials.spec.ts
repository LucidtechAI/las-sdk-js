import functions, {AuthorizationCodeCredentials, PKCE, PKCEDerived} from './credentials';
import {default as uuidv4} from 'uuid/v4';

function getCredentials(testLaunchUri: (arg0: string) => void, pkce?: PKCEDerived) {
    const testApiKey = 'testApiKey';
    const testClientId = 'testClientId';
    const testAuthEndpoint = 'http://localhost:8080';
    const testRedirectUri = 'testRedirectUri';

    return new AuthorizationCodeCredentials(testApiKey, testClientId, testAuthEndpoint, testRedirectUri, testLaunchUri, pkce);
}

test('Testing randomString', () => {
    const getRandomValues = (buffer: any): any => {
        for (let i = 0; i < buffer.byteLength; i += 1) {
            buffer[i] = Math.floor(256 * Math.random());
        }
    };

    Object.defineProperty(window, 'crypto', {
        value: {
            getRandomValues() {}
        }
    });

    jest.spyOn(window.crypto, 'getRandomValues').mockImplementation(getRandomValues);
    expect(window.crypto.getRandomValues).not.toHaveBeenCalled();

    const alphabet = PKCE.CODE_CHALLENGE_ALPHABET;
    const size = 4096;

    const s = functions.randomString(alphabet, size);
    expect(s).toHaveLength(size);
    expect(s.replace(new RegExp(`[${alphabet}]`, 'g'), '')).toHaveLength(0);

    expect(window.crypto.getRandomValues).toHaveBeenCalled();
    jest.clearAllMocks();
});

test('Testing initiateOAuthFlow', async () => {
    const randomStringMock = (a: string, b: number) => uuidv4();
    jest.spyOn(functions, 'randomString').mockImplementation(randomStringMock);

    const testLaunchUri = jest.fn();
    const credentials = getCredentials(testLaunchUri);
    credentials.initiateOAuthFlow();
    expect(testLaunchUri).toHaveBeenCalled();

    jest.clearAllMocks();
});

test('Testing initiateLogoutFlow', async () => {
    const randomStringMock = (a: string, b: number) => uuidv4();
    jest.spyOn(functions, 'randomString').mockImplementation(randomStringMock);

    const testLaunchUri = jest.fn();
    const credentials = getCredentials(testLaunchUri);
    credentials.initiateLogoutFlow();
    expect(testLaunchUri).toHaveBeenCalled();

    jest.clearAllMocks();
});
