// This is a Cypress end-to-end test file for the frontend home page.
describe("Frontend Home Page", () => {
  // This test checks if the React app loads successfully when we visit the local Vite server.
  it("should load the React app successfully", () => {
    // 1. Visit the local Vite server where the React app is running.
    cy.visit("http://localhost:5173");

    // 2. Check if the page contains the "My Game Library" text on the page to confirm that the app has loaded.
    cy.contains("My Game Library").should("be.visible");
  });
});
