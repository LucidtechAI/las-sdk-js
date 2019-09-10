import {AuthorizationCodeCredentials, PKCEDerived} from "@lucidtech/las-sdk-browser";


function createTextDiv(text) {
    const div = document.createElement('div');
    const textNode = document.createTextNode(text);
    div.appendChild(textNode);
    document.body.append(div);
}


function createSignInButton(credentials) {
    const button = document.createElement('button');
    button.innerHTML = 'Sign In';
    button.onclick = function() { credentials.initiateOAuthFlow(); };
    document.body.append(button);
}


function createLogOutButton(credentials) {
    const button = document.createElement('button');
    button.innerHTML = 'Log Out';
    button.onclick = function() { credentials.initiateLogoutFlow(); };
    document.body.append(button);
}


function createGetAccessTokenButton(credentials) {
    const button = document.createElement('button');
    button.innerHTML = 'Get Access Token';
    button.onclick = function() {
        credentials.getAccessToken().then(accessToken => {
            console.log(`Got access token: ${accessToken}`);
            createTextDiv(`Access token: ${accessToken}`);
        }).catch(error => {
            console.log(`Error retrieving access token: ${JSON.stringify(error)}`);
        });
    };
    document.body.append(button);
}


function getCodeFromUrl() {
    const url = new URL(window.location.href);
    return url.searchParams.get('code');
}


function createCredentials() {
    const apiKey = '<apiKey>';
    const clientId = '<clientId>';
    const authEndpoint = '<authEndpoint>';
    const redirectUri = '<redirectUri>';
    const launchUri = (uri) => window.open(uri, '_self');

    const code = getCodeFromUrl();
    const pkce = PKCEDerived.createFromCode(code);
    return new AuthorizationCodeCredentials(apiKey, clientId, authEndpoint, redirectUri, launchUri, pkce);
}


window.onload = (_) => {
    const credentials = createCredentials();

    if (credentials.isLoggedIn()) {
        createGetAccessTokenButton(credentials);
        createLogOutButton(credentials);
    } else {
        createSignInButton(credentials);
    }
};

