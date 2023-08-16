describe('Podcast search', () => {
  it('should get more than 1 "tech" podcasts when "tech" is searched', () => {
    cy.visit('http://localhost:9000/');
    cy.get('#search-podcast').type('tech{enter}');
    cy.get('#results a').should('be.visible');
    cy.get('#results a').should('have.length.gte', 1);
  });

  it('should type select the first "tech" podcast and show the detail', () => {
    cy.visit('http://localhost:9000/');
    cy.get('#search-podcast').type('tech{enter}');
    cy.get('#results a').should('be.visible');
    cy.get('#results a').first().click();
    cy.contains('Esta es la página de detalle del podcast').should(
      'be.visible',
    );
  });

  it('should type select the first "tech" podcast and show the detail, then return to the results', () => {
    cy.visit('http://localhost:9000/');
    cy.get('#search-podcast').type('tech{enter}');
    cy.get('#results a').should('be.visible');
    cy.get('#results a').first().click();
    cy.contains('a', 'Volver').click();
    cy.url().should('eq', 'http://localhost:9000/');
  });
});