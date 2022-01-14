describe(`after visiting ["www.welcometothejungle.com/fr/me/settings/account"] webpage, clicking on ["Se connecter"] button, filling ["Email", "Mot de passe"] inputs, clicking ["Se connecter"] button, filling ["Photo de profil"] input and clicking on ["OK"] button`, () => {
  
  before(() => {
    cy.login();
    cy.wait(10000);
  })
  after(() => {
    cy.clearLocalStorage();
  });


  it("_profile-avatar data are updated", () => {
    
    //  Get the photo 
    cy.visit({
      url: 'fr/me/settings/account',
      method: 'GET',
    })
    cy.wait(2000);
  

  })
})