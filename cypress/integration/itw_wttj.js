import 'cypress-file-upload';

describe(`after visiting ["www.welcometothejungle.com/fr/me/settings/account"] webpage, clicking on ["Se connecter"] button, filling ["Email", "Mot de passe"] inputs, clicking ["Se connecter"] button, filling ["Photo de profil"] input and clicking on ["OK"] button`, () => {
  
  before(() => {
    cy.login();
    cy.wait(10000);
  })
  after(() => {
    cy.clearLocalStorage();
  });


  it("_profile-avatar data are updated", () => {
    
    //  Go in the profil page
    cy.visit({
      url: 'fr/me/settings/account',
      method: 'GET',
    })

    cy.get('[data-testid="account-edit-field-avatar"]').then($element => {
      // if an image is already uploaded
      if ($element.find('#avatar > div > div > div > button.sc-jKTccl.dfbeHM').length > 0) {
        // Click on trash to delete an image
         cy.get('#avatar > div > div > div > button.sc-jKTccl.dfbeHM').click();

        // wait
        cy.wait(2000);

        // upload an image
        const filepath = 'img/inqom.png';

        cy.get('[data-testid="account-edit-field-avatar"] > #avatar > div > .hdwsRW')
        .attachFile(filepath, { subjectType: 'drag-n-drop' });
         
        // Save the update
         cy.get('#prc-1-1-1-1 > form > button').click();
      }
      // if the image is not already uploaded
      else {
        // upload an image
        const filepath = 'img/inqom.png';

        cy.get('[data-testid="account-edit-field-avatar"] > #avatar > div > .hdwsRW')
        .attachFile(filepath, { subjectType: 'drag-n-drop' });
                
         // Save the update
         cy.get('#prc-1-1-1-1 > form > button').click();
     }
    });

    // Check if the image has been updated
    cy.get('[data-testid="account-edit-field-avatar"] > #avatar > div > img').should('exist');
  })
})