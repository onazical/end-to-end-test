// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import 'cypress-file-upload';

Cypress.Commands.add('attachFiles', {
  prevSubject: 'element'
}, (dom_element, files_data) => {
  if (!Array.isArray(files_data)) files_data = [files_data]
  const data_transfer = new DataTransfer()
  cy.window().then((win) => {
    for (let i = 0; i < files_data.length; i++) {
      const file = files_data[i]
      const data = new win.File([file["file"]], file["name"], {
        "type": file["type"]
      })
      data_transfer["items"].add(data)
    }
    dom_element[0]["files"] = data_transfer["files"]
  })
  return cy.get(dom_element).trigger('drop', {
    force: true
  })
})

Cypress.Commands.add('upload_file', (fileName, selector) => {
  return cy.get(selector).then(subject => {
    return cy.fixture(fileName, 'base64')
      .then(Cypress.Blob.base64StringToBlob)
      .then(blob => {
        const el = subject[0]
        const testFile = new File([blob], fileName, { type: 'image/png' })
        const dataTransfer = new DataTransfer()
        dataTransfer.items.add(testFile)
        el.files = dataTransfer.files
        return subject;
      })
  })
})

Cypress.Commands.add('login',
  () => {
    cy.readFile('cypress/fixtures/ids/data.json').then(data => {
    cy.visit(data.baseUrl);
    cy.url().should('eq', data.baseUrl);
    cy.get('div.sc-cxpSdN.sc-iIUQWv.dyWuYH > div.sc-cxpSdN.sc-iIUQWv.dyWuYH > button').click();
    cy.get('#email_login').type(data.email);
    cy.get('#password').type(data.password);
    cy.get('#modal-content-home > div > div > form > button').click();
    });
  },
);