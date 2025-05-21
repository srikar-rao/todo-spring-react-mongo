import keycloak from './keycloak';

export const initKeycloak = (): Promise<boolean> =>
  keycloak.init({ onLoad: 'login-required' });

export const getToken = (): string | undefined => keycloak.token;

export const logout = () => keycloak.logout();

export const getUsername = (): string | undefined =>
  keycloak.tokenParsed?.preferred_username;

export const getUserInfo = () => keycloak.tokenParsed;

export const getUserId = (): string | undefined =>
  keycloak.tokenParsed?.sub;

export const hasAnyRole = (roles: string[] = []): boolean => {
  const userRoles = keycloak?.tokenParsed?.realm_access?.roles ?? [];
  return roles.some((role) => userRoles.includes(role));
};

