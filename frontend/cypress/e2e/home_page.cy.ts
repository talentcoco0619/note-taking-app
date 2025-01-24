describe("template spec", () => {
  it("passes", () => {
    cy.visit("/");

    //login--------------------------
    cy.visit("/login");

    cy.get("input[id=login_form_email]").type("mastersuperdev@gmail.com");

    cy.get("input[id=login_form_password]").type("1234");

    cy.get("button[type=submit]").click();

    cy.url().should("include", "/dashboard");

    cy.contains("Login successfully!");

    //create note1--------------------------
    cy.get("button[id=create_button]").click();

    cy.contains("Create New Note");

    cy.get("input[id=title]").type("End-to-End testing");

    cy.get("textarea[id=description]").type(
      "You can write Cypress tests to check the accessibility of your application, and use plugins to run broad accessibility scans. When combined with Cypress Accessibility in Cypress Cloud, insights can be surfaced when specific accessibility standards are not met through your testing - with no configuration required. See our Accessibility Testing guide for more details."
    );

    cy.get(".audio-recorder").click();

    cy.wait(4000);

    cy.get(".audio-recorder-mic").click();


    cy.get("input[id=date").type("2025-01-13");

    cy.get(".ant-modal-footer")
      .find("button")
      .contains("Create").filter(':visible').first()
      .click();
    cy.get(".ant-modal-footer")
      .find("button")
      .contains("Create").filter(':visible').first()
      .click();
    cy.contains("Note created successfully!");

    cy.wait(3000);


    //create note2--------------------------
    cy.get("button[id=create_button]").click();

    cy.contains("Create New Note");

    cy.get("input[id=title]").type("Unit testing");

    cy.get("textarea[id=description]").type(
      "At this point there's nothing stopping you copying and pasting the login code above into every one of your tests that needs an authenticated user."
    );

    cy.get(".audio-recorder").click();

    cy.wait(3000);

    cy.get(".audio-recorder-mic").click();

    cy.get("input[id=date").type("2025-01-18");

    cy.get(".ant-modal-footer")
      .find("button")
      .contains("Create")
      .click();
    cy.get(".ant-modal-footer")
      .find("button")
      .contains("Create")
      .click();
    cy.contains("Note created successfully!");

    cy.wait(2000);

    //search test--------------------------
    cy.get("input[id=search-notes]").type("End-to-End");

    cy.wait(2000);

    cy.get("input[id=search-notes]").clear();

    cy.wait(1000);


    //show detail--------------------------
    cy.get(".ant-table-cell")
      .find("button")
      .contains("End-to-End testing")
      .click();

    cy.wait(3000);

    cy.get(".ant-modal-close").filter(':visible').first().click();

    cy.wait(2000);



    //Edit Note------------------------------------
    cy.get("button").filter(':contains("Edit")').first().click();
    cy.wait(1000);
    cy.get("input[id=title]").filter(':visible').first().type("(Updated)");
    cy.wait(2000);
    cy.get(".ant-modal-footer")
      .find("button")
      .contains("Update")
      .click();
    cy.contains("Note updated successfully!");

    cy.wait(10000);

    // cy.get("button[id=logout-button]").click();

    // cy.contains("Logged out successfully!");

  });
});
