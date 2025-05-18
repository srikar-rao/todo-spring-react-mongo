import keycloak from './keycloak';

export const initKeycloak = (): Promise<boolean> =>
  keycloak.init({ onLoad: 'login-required' });

export const getToken = (): string | undefined => keycloak.token;

export const logout = () => keycloak.logout();

export const getUsername = (): string | undefined =>
  keycloak.tokenParsed?.preferred_username;

export const getUserInfo = () => keycloak.tokenParsed;

