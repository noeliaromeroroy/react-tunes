describe('Navigation tests', () => {
  it('should get more than 1 "tech" podcasts when "tech" is searched', () => {
    cy.visit('http://localhost:9000/');
    cy.get('[data-cy^=search-podcast]').type('tech{enter}');
    cy.get('[data-cy^=title-podcast-]', { timeout: 20000 }).should(
      'be.visible',
    );
    cy.get('[data-cy^=title-podcast-]').should('have.length.gte', 1);
  });

  it('should type "tech" and select the first podcast and show the detail', () => {
    cy.visit('http://localhost:9000/');
    cy.get('[data-cy^=search-podcast]').type('tech{enter}');
    cy.get('[data-cy^=title-podcast-]', { timeout: 20000 }).should(
      'be.visible',
    );
    cy.get('[data-cy^=title-podcast-]').first().click();
    cy.get('[data-cy^=detail-]', { timeout: 20000 }).should('be.visible');
  });

  it('should type "tech" and select the first podcast. Show the detail, then return to the homepage', () => {
    cy.visit('http://localhost:9000/');
    cy.get('[data-cy^=search-podcast]').type('tech{enter}');
    cy.get('[data-cy^=title-podcast-]', { timeout: 20000 }).should(
      'be.visible',
    );
    cy.get('[data-cy^=title-podcast-]').first().click();
    cy.get('[data-cy^=detail-]', { timeout: 20000 }).should('be.visible');
    cy.get('[data-cy^=back-to-home]').click();
    cy.url().should('eq', 'http://localhost:9000/');
  });

  it('should type "tech" and select the first podcast. Show the detail, then type "react" and get back to homepage', () => {
    cy.visit('http://localhost:9000/');
    cy.get('[data-cy^=search-podcast]').type('tech{enter}');
    cy.get('[data-cy^=title-podcast-]', { timeout: 20000 }).should(
      'be.visible',
    );
    cy.get('[data-cy^=title-podcast-]').first().click();
    cy.get('[data-cy^=detail-]', { timeout: 20000 }).should('be.visible');
    cy.get('[data-cy^=search-podcast]').clear().type('react{enter}');
    cy.url().should('eq', 'http://localhost:9000/');
    cy.get('[data-cy^=title-podcast-]', { timeout: 20000 }).should(
      'be.visible',
    );
  });

  it('should type "guacamole", select the first podcast and select the rest of episodes. Then, pauses', () => {
    cy.visit('http://localhost:9000/');
    cy.get('[data-cy^=search-podcast]').type('guacamole{enter}');
    cy.get('[data-cy^=title-podcast-]', { timeout: 20000 }).should(
      'be.visible',
    );
    cy.get('[data-cy^=title-podcast-]').first().click();
    cy.get('[data-cy^=detail-]', { timeout: 20000 }).should('be.visible');

    cy.get('[data-cy^=play-detail]').its('length').as('totalItems');

    cy.get('[data-cy^=play-detail]').first().click();
    cy.get('[data-cy=btn-next]').should('be.disabled');
    cy.wait(5000);

    cy.get('[data-cy^=play-detail]').each((item, index) => {
      cy.wrap(item).click();
      cy.get('@totalItems').then((totalItems: any) => {
        if (index === totalItems - 1) {
          cy.get('[data-cy=btn-prev]').should('be.disabled');
        }
      });
      cy.wait(5000);
    });
    cy.get('[data-cy=btn-play]').first().click();
    cy.get('[data-cy=play-icon]').should('be.visible');
  });
});