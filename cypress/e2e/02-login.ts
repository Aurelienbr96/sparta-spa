import { successful } from '../fixtures/authentication/successful';
import { userToLogin } from 'cypress/fixtures/users/user-to-login';
export const baseUrl = 'http://localhost:3001';

describe('Login', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Should allow user to login from /login/ and redirect to /dashboard', () => {
    cy.intercept('POST', '/auth/login/', {
      statusCode: 200,
      body: successful,
    });

    cy.findByTestId('login-page-email').type(userToLogin.email);
    cy.findByTestId('login-page-password').type(userToLogin.password);

    cy.findByTestId('login-page-submit').should('not.be.disabled').click();
    cy.url().should('eq', `${baseUrl}/dashboard`);
  });

  it('Should allow a logged in user from /dashboard/ and redirect to /', () => {
    cy.intercept('POST', '/auth/logout/', {
      statusCode: 200,
      body: successful,
    });

    cy.intercept('POST', '/auth/login/', {
      statusCode: 200,
      body: successful,
    });

    cy.findByTestId('login-page-email').type(userToLogin.email);
    cy.findByTestId('login-page-password').type(userToLogin.password);

    cy.findByTestId('login-page-submit').should('not.be.disabled').click();
    cy.url().should('eq', `${baseUrl}/dashboard`);

    cy.findByTestId('logout-button').should('not.be.disabled').click();
    cy.url().should('eq', `${baseUrl}/`);
  });

  it('Should display an error if password or email are incorrect in /login/', () => {
    cy.intercept('POST', '/auth/login/', {
      statusCode: 200,
      body: successful,
    });

    cy.findByTestId('login-page-email').type(userToLogin.email);
    cy.findByTestId('login-page-password').type('wrong password');

    cy.findByTestId('login-page-submit').should('not.be.disabled').click();
    cy.findByTestId('login-error-message').should('exist');
  });
});
