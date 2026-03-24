describe("Frontend Home Page", () => {
  // Our first test: just checking if the page loads
  it("should load the React app successfully", () => {
    cy.visit("http://localhost:5173");
    cy.contains("My Game Library").should("be.visible");
  });

  // Our second test: interacting with the form
  it("should add a new game through the form", () => {
    // 1. Always start by visiting the correct URL
    cy.visit("http://localhost:5173");

    // 2. Find the input fields using their placeholder attributes and type into them
    cy.get('input[placeholder="Title"]').type("Cyberpunk 2077");
    cy.get('input[placeholder="Genre (e.g., RPG, FPS)"]').type("RPG");
    cy.get('input[placeholder="Release Year (e.g., 2015)"]').type("2020");
    cy.get('input[placeholder="Rating (1-10)"]').type("8.5");

    // 3. Find the checkbox by its type and check it
    cy.get('input[type="checkbox"]').check();

    // 4. Find the submit button by its text and click it
    cy.contains("button", "Add Game").click();

    // 5. Assert that the game was successfully added to the visible list
    // Cypress is smart enough to wait a few seconds for the backend to respond
    // before it fails these assertions!
    cy.contains("Cyberpunk 2077").should("be.visible");
    cy.contains("✅ Completed").should("be.visible");
  });
  // Our third test: The full CRUD lifecycle
  it("should create, update, and delete a game cleanly", () => {
    cy.visit("http://localhost:5173");

    // 1. Create a game with a unique name so we know exactly which one to delete
    const testGameTitle = "Cypress Automated Test Game";

    cy.get('input[placeholder="Title"]').type(testGameTitle);
    cy.get('input[placeholder="Genre (e.g., RPG, FPS)"]').type("Test");
    cy.get('input[placeholder="Release Year (e.g., 2015)"]').type("2024");
    cy.get('input[placeholder="Rating (1-10)"]').type("9.9");
    cy.contains("button", "Add Game").click();

    // Verify it appeared
    cy.contains(testGameTitle).should("be.visible");

    // 2. Find the SPECIFIC list item (li) that contains our test game
    cy.contains("li", testGameTitle).within(() => {
      // Everything inside here ONLY looks inside this specific game's row!

      // UPDATE: Click the Mark as Done button and verify it changes
      cy.contains("❌ Mark as Done").click();
      cy.contains("✅ Completed").should("be.visible");

      // DELETE: Click the delete button
      cy.contains("button", "Delete").click();
    });

    // 3. Verify that the game has been completely removed from the screen
    cy.contains(testGameTitle).should("not.exist");
  });
});
