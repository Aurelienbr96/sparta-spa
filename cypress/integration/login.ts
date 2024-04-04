import { baseUrl } from '../../cypress.json';
import { successful } from '../fixtures/authentication/successful';
import { userToLogin } from '../fixtures/users/user-to-login';

describe('Login', () => {
  beforeEach(() => {
    cy.visit('/login/');
  });

  it('Should allow user to login from /login/ and redirect to /', () => {
    cy.intercept('POST', '/auth/login/', {
      statusCode: 200,
      body: successful,
    });

    cy.findByTestId('login-template-email').type(userToLogin.email);
    cy.findByTestId('login-template-password').type(userToLogin.password);

    cy.findByTestId('login-template-submit').should('not.be.disabled').click();
    cy.url().should('eq', `${baseUrl}/`);
  });
});
