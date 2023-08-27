describe('Navigation tests', () => {
  it('should get more podcasts when "LOAD MORE" Button is clicked', () => {
    cy.visit('http://localhost:9000/');
    cy.get('[data-cy^=search-podcast]', { timeout: 20000 }).type('tech{enter}');
    cy.get('[data-cy^=search-load-more]', { timeout: 20000 }).should('exist');
    cy.get('[data-cy^=search-load-more]').scrollIntoView().should('be.visible');
    cy.get('[data-cy^=title-podcast-]').should('have.length', 10);
    cy.get('[data-cy^=search-load-more]').click();
    cy.wait(3000);
    cy.get('[data-cy^=title-podcast-]').should((items) => {
      expect(items).to.have.length.greaterThan(10);
    });
  });

  it('should get more than 1 "tech" podcasts when "tech" is searched', () => {
    cy.visit('http://localhost:9000/');
    cy.get('[data-cy^=search-podcast]', { timeout: 20000 }).type('tech{enter}');
    cy.get('[data-cy^=title-podcast-]', { timeout: 20000 }).should(
      'be.visible',
    );
    cy.get('[data-cy^=title-podcast-]').should('have.length.gte', 1);
  });

  it('should type "tech" and select the first podcast and show the detail', () => {
    cy.visit('http://localhost:9000/');
    cy.get('[data-cy^=search-podcast]', { timeout: 20000 }).type('tech{enter}');
    cy.get('[data-cy^=title-podcast-]', { timeout: 20000 }).should(
      'be.visible',
    );
    cy.get('[data-cy^=title-podcast-]').first().click();
    cy.get('[data-cy^=detail-]', { timeout: 20000 }).should('be.visible');
  });

  it('should type "Two Ends of the Guacamole", select the first podcast and select the rest of episodes. Then, pauses', () => {
    cy.visit('http://localhost:9000/');
    cy.get('[data-cy^=search-podcast]', { timeout: 20000 }).type(
      'Two Ends of the Guacamole{enter}',
    );
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

  it('should type "tech" and select the first podcast. Show the detail, then return to the homepage', () => {
    cy.visit('http://localhost:9000/');
    cy.get('[data-cy^=search-podcast]', { timeout: 20000 }).type('tech{enter}');
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
    cy.get('[data-cy^=search-podcast]', { timeout: 20000 }).type('tech{enter}');
    cy.get('[data-cy^=title-podcast-]', { timeout: 20000 }).should(
      'be.visible',
    );
    cy.get('[data-cy^=title-podcast-]').first().click();
    cy.get('[data-cy^=detail-]', { timeout: 20000 }).should('be.visible');
    cy.get('[data-cy^=search-podcast]', { timeout: 20000 })
      .clear()
      .type('react{enter}');
    cy.url().should('eq', 'http://localhost:9000/');
    cy.get('[data-cy^=title-podcast-]', { timeout: 20000 }).should(
      'be.visible',
    );
  });
});