describe('PlayerBar tests', () => {
  it('should have previous, next, and play buttons disabled on load', () => {
    cy.visit('http://localhost:9000/');
    cy.get('[data-cy=btn-prev]').should('be.disabled');
    cy.get('[data-cy=btn-next]').should('be.disabled');
    cy.get('[data-cy=btn-play]').should('be.disabled');
  });

  it('should have play button enabled and next button disabled when selecting a podcast', () => {
    cy.visit('http://localhost:9000/');
    cy.get('[data-cy^=search-podcast]').type('tech{enter}');
    cy.get('[data-cy^=play-]', { timeout: 20000 }).should('be.visible');
    cy.get('[data-cy^=play-]').eq(1).click();
    cy.get('[data-cy=btn-next]').should('be.disabled');
    cy.get('[data-cy=btn-play]', { timeout: 20000 }).should('be.enabled');
  });

  it('should have next button enabled when shuffle is active', () => {
    cy.visit('http://localhost:9000/');
    cy.get('[data-cy^=search-podcast]').type('tech{enter}');
    cy.get('[data-cy^=play-]', { timeout: 20000 }).should('be.visible');
    cy.get('[data-cy^=play-]').eq(1).click();
    cy.get('[data-cy=btn-next]').should('be.disabled');
    cy.get('[data-cy=btn-play]', { timeout: 20000 }).should('be.enabled');
    cy.get('[data-cy^=btn-shuffle]').first().click();
    cy.get('[data-cy=btn-next]').should('be.enabled');
  });

  it('should repeat the same episode when "repeat" is active', () => {
    cy.visit('http://localhost:9000/');
    cy.get('[data-cy^=search-podcast]').type('tech{enter}');
    cy.get('[data-cy^=play-]', { timeout: 20000 }).should('be.visible');
    cy.get('[data-cy^=play-]').eq(1).click();
    cy.get('[data-cy^=btn-repeat]').first().click();
    cy.get('[data-cy=btn-play]', { timeout: 20000 }).should('be.enabled');
    cy.wait(2000);
    cy.get('[data-cy^=btn-next]').first().click();
  });
});