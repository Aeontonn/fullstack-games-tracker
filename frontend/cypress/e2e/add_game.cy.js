describe('Game Library App', () => {
  it('should successfully add 10 games to the library', () => {
    // Visit the local development server
    cy.visit('http://localhost:5173');

    // Create an array containing 10 different games to test our layout
    const gamesToAdd = [
      { title: 'Super Mario 64', genre: 'Platformer', year: '1996', rating: '10', completed: true },
      { title: 'The Witcher 3', genre: 'RPG', year: '2015', rating: '9.8', completed: false },
      { title: 'Half-Life 2', genre: 'FPS', year: '2004', rating: '9.5', completed: true },
      { title: 'Stardew Valley', genre: 'Simulation', year: '2016', rating: '9.0', completed: true },
      { title: 'Cyberpunk 2077', genre: 'RPG', year: '2020', rating: '8.5', completed: false },
      { title: 'Hades', genre: 'Roguelike', year: '2020', rating: '9.7', completed: true },
      { title: 'Portal 2', genre: 'Puzzle', year: '2011', rating: '9.9', completed: true },
      { title: 'Elden Ring', genre: 'Action RPG', year: '2022', rating: '9.6', completed: false },
      { title: 'Minecraft', genre: 'Sandbox', year: '2011', rating: '10', completed: false },
      { title: 'Zelda: Ocarina of Time', genre: 'Adventure', year: '1998', rating: '9.9', completed: true }
    ];

    // Loop through each game in the array and add it
    gamesToAdd.forEach((game) => {
      // We type the specific details for the current game in the loop
      cy.get('[data-cy="input-title"]').type(game.title);
      cy.get('[data-cy="input-genre"]').type(game.genre);
      cy.get('[data-cy="input-year"]').type(game.year);
      cy.get('[data-cy="input-rating"]').type(game.rating);
      
      // Conditional logic: Check the box if completed, uncheck if not
      if (game.completed) {
        cy.get('[data-cy="input-completed"]').check();
      } else {
        cy.get('[data-cy="input-completed"]').uncheck();
      }

      // Submit the form
      cy.get('[data-cy="submit-btn"]').click();

      // Assert that this specific game appeared in the grid before moving to the next
      cy.get('[data-cy="game-grid"]')
        .should('contain', game.title)
        .and('contain', game.genre);
    });
    it('should be able to delete a specific game', () => {
    // 1. Först lägger vi till ett unikt testspel så vi vet exakt vad vi ska ta bort
    const testGameTitle = 'Testspel för borttagning';
    
    cy.get('[data-cy="input-title"]').type(testGameTitle);
    cy.get('[data-cy="input-genre"]').type('Action');
    cy.get('[data-cy="input-year"]').type('2024');
    cy.get('[data-cy="input-rating"]').type('5');
    cy.get('[data-cy="submit-btn"]').click();

    // 2. Bekräfta att vårt testspel dök upp i listan
    cy.contains('.game-card', testGameTitle).should('exist');

    // 3. SCOPING: Leta upp kortet som innehåller vår titel, 
    //    leta sedan inuti det specifika kortet efter Delete-knappen och klicka.
    cy.contains('.game-card', testGameTitle)
      .find('.btn-danger')
      .click();

    // 4. Bekräfta att kortet med vår titel är helt borta från sidan
    cy.contains('.game-card', testGameTitle).should('not.exist');
  });
    // Optional: After the loop, verify we actually have at least 10 cards on screen
    cy.get('[data-cy="game-card"]').should('have.length.at.least', 10);
  });
});