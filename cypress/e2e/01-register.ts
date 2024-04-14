import { successful } from '../fixtures/authentication/successful';
import { userToLogin } from 'cypress/fixtures/users/user-to-login';

export const baseUrl = 'http://localhost:3001';

describe('register', () => {
  beforeEach(() => {
    cy.request('POST', `${Cypress.env('apiUrl')}/test-api/reset-database`);
    cy.visit('/');
  });

  it('Should allow user to login from /login/ and redirect to /dashboard', () => {
    cy.intercept('POST', '/auth/login/', {
      statusCode: 200,
      body: successful,
    });

    cy.findByTestId('signup-page-link').should('not.be.disabled').click();
    cy.findByTestId('coach-role-card-button').should('not.be.disabled').click();

    cy.findByTestId('register-page-password').type(userToLogin.password);
    cy.findByTestId('register-page-email').type(userToLogin.email);
    cy.findByTestId('register-page-submit').should('not.be.disabled').click();
    cy.url().should('eq', `${baseUrl}/dashboard`);
  });
});
