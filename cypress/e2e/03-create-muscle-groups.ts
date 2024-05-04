import { muscleGroupToCreate } from 'cypress/fixtures/muscle-groups/muscle-to-create';

import { userToLogin } from 'cypress/fixtures/users/user-to-login';
export const baseUrl = 'http://localhost:3001';

describe('Muscle group', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.task('resetDatabase');
    cy.task('seedUser');
    cy.login(userToLogin.email, userToLogin.password);
  });

  it('Should allow user to create a muscle group', () => {
    cy.intercept('POST', '/muscle-group').as('createMuscleGroup');

    cy.findByTestId('muscle-group-name-input').type(muscleGroupToCreate.name);
    cy.findByTestId('muscle-group-description-input').type(muscleGroupToCreate.description);

    cy.findByTestId('muscle-group-submit').should('not.be.disabled').click();
    cy.wait('@createMuscleGroup').then(() => {
      cy.findByText(muscleGroupToCreate.name).should('exist');
    });
  });
});
