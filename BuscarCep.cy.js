const faker = require('faker')

describe('Busca de CEP', () => {
  Cypress._.times(50, () => {
    it('Encontrar CEP válido', () => {
      cy.visit('https://buscacepinter.correios.com.br/app/endereco/index.php')
      
      let cepValidoEncontrado = false;
      let cepGerado;
  
      while (!cepValidoEncontrado) {
        cepGerado = faker.address.zipCode("#####-###")
        cy.get('#endereco').clear().type(cepGerado)
        cy.get('#btn_pesquisar').click()
        if (cy.get('#resultado-DNEC > thead > tr > [data-th="CEP"]').contains('CEP').should('be.visible')) {
          cepValidoEncontrado = true;
        }
      }
  
      // Se chegou aqui, significa que um CEP válido foi encontrado
      cy.log(`CEP válido encontrado: ${cepGerado}`)
    })
  })
})
