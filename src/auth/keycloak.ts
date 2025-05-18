import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'http://localhost:9095/',
  realm: 'todo-web-app',
  clientId: 'todo-client',
});

export default keycloak;
