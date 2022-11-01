import { WebStorageStateStore, UserManagerSettings } from 'oidc-client';

export const oauthConfig: UserManagerSettings = {
  authority: 'https://accounts.google.com',
  // TODO: Add your Client ID here (https://console.cloud.google.com/apis/credentials)
  client_id: '229736874798-0vi7knh0kti2sok3g0uvg5l9tdpsdndc.apps.googleusercontent.com',
  redirect_uri: 'http://localhost:4200/auth-callback',
  popup_redirect_uri: 'http://localhost:4200/auth-callback',
  response_type: 'id_token token',
  scope: 'openid profile https://www.googleapis.com/auth/userinfo.email',
  loadUserInfo: true,
  userStore: new WebStorageStateStore({ store: window.localStorage }),
  max_age: 0,
  revokeAccessTokenOnSignout: true,
  automaticSilentRenew: true,
  extraQueryParams: {
    force_verify: true
  },
}
