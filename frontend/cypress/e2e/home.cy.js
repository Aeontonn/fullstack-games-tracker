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
});
