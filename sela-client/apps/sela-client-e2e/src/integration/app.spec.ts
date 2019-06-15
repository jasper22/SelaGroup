import { getGreeting } from '../support/app.po';

describe('sela-client', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Welcome to sela-client!');
  });
});
