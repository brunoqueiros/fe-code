describe('Signup form', () => {
  it('Visits the initial project page', () => {
    cy.visit('/');
    cy.contains('User dashboard');
  });

  it('Submit button should be disabled', () => {
    cy.visit('/');
    cy.get('[data-testid="signup-submit-button"]').should('be.disabled');
  });

  it('Submit button should be enabled', () => {
    cy.visit('/');
    cy.findByTestId('signup-first-name').type('Bruno');
    cy.findByTestId('signup-last-name').type('Queiros');
    cy.findByTestId('signup-email').type('bruno@bruno.com');
    cy.findByTestId('signup-password').type('1234QWEasd');
    cy.findByTestId('signup-submit-button').should('be.enabled');
  });

  it('Submit button should be enabled', () => {
    cy.visit('/');
    cy.findByTestId('signup-first-name').type('Bruno');
    cy.findByTestId('signup-last-name').type('Queiros');
    cy.findByTestId('signup-email').type('bruno@bruno.com');
    cy.findByTestId('signup-password').type('1234QWEasd');
    cy.findByTestId('signup-submit-button').should('be.enabled');
  });

  it('Show snack bar component when form is subimited', () => {
    cy.intercept('POST', 'https://demo-api.vercel.app/users').as('addUsers');
    cy.visit('/');
    cy.findByTestId('signup-first-name').type('Bruno');
    cy.findByTestId('signup-last-name').type('Queiros');
    cy.findByTestId('signup-email').type('bruno@bruno.com');
    cy.findByTestId('signup-password').type('1234QWEasd');
    cy.findByTestId('signup-submit-button').click();
    cy.wait('@addUsers');
    cy.findByText('🎉 User created');
  });

  describe('validations', () => {
    it('Show errors message for first name', () => {
      cy.visit('/');
      cy.findByTestId('signup-first-name').focus().blur();
      cy.findByTestId('signup-first-name-errors').contains('This field is required');
      cy.findByTestId('signup-first-name').type('Bruno');
      cy.findByTestId('signup-first-name-errors').should('not.exist');
    });

    it('Show errors message for last name', () => {
      cy.visit('/');
      cy.findByTestId('signup-last-name').focus().blur();
      cy.findByTestId('signup-last-name-errors').contains('This field is required');
      cy.findByTestId('signup-last-name').type('Bruno');
      cy.findByTestId('signup-last-name-errors').should('not.exist');
    });

    it('Show errors message for email', () => {
      cy.visit('/');
      cy.findByTestId('signup-email').focus().blur();
      cy.findByTestId('signup-email-errors').contains('This field is required');
      cy.findByTestId('signup-email').type('wrong-email');
      cy.findByTestId('signup-email-errors').contains('This field should be a valid email');
      cy.findByTestId('signup-email').type('correct@email.com');
      cy.findByTestId('signup-email-errors').should('not.exist');
    });

    it('Show errors message for password', () => {
      cy.visit('/');
      cy.findByTestId('signup-password').focus().blur();
      cy.findByTestId('signup-password-errors').contains('This field is required');
      cy.findByTestId('signup-password').clear().type('abC');
      cy.findByTestId('signup-password-errors').contains('This field should have at least 8 letters');
      cy.findByTestId('signup-password').clear().type('withoutuppercase');
      cy.findByTestId('signup-password-errors').contains('This field should contain an uppercase letter');
      cy.findByTestId('signup-password').clear().type('WITHOUTLOWERCASE');
      cy.findByTestId('signup-password-errors').contains('This field should contain a lowercase letter');
      cy.findByTestId('signup-password').clear().type('Validpassword');
      cy.findByTestId('signup-password-errors').should('not.exist');
    });
  });
});
