import faker from 'faker'

describe('Purchase flow', () => {
  let registrationCredentials

  beforeEach(() => {
    cy.visit('information/contact')
    cy.fixture('registrationCredentials').then(function (user) {
      registrationCredentials = user
    })
  })

  it('A user can add a product to the cart', () => {
    let productName
    let productPrice

    cy.openCategory('Phones & PDAs')
    cy.getProductNameFromProductPage().then(value => {
      productName = value.text()
    })
    cy.getProductPriceFromProductPage().then(value => {
      const text = value.text()
      productPrice = text.slice(1, 8)
    })
    cy.addItemToCart()

    cy.get('body').then(() => {
      cy.get('.alert').contains(' Success: You have added ' + productName + ' to your shopping cart')
        .should('be.visible')
    })

    cy.openShoppingCard()

    cy.getProductNameFromCartPage().then(value => {
      cy.wrap(value).should('have.text', productName)
    })

    cy.getProductPriceFromCartPage().then(value => {
      cy.wrap(value).should('have.text', productPrice)
    })
  })

  it('A user can send a message to support', () => {
    const name = registrationCredentials.firstname
    const email = registrationCredentials.email
    const msg = faker.lorem.sentences()

    cy.inputContactForm(name, email, msg)
    cy.intercept({ method: 'GET', url: '**/contact/success' }).as('success')
    cy.submitForm()
    cy.wait('@success')
  })

  it('A user can add a product to wishlist', () => {
    const firstname = registrationCredentials.firstname
    const lastname = registrationCredentials.lastname
    const email = faker.internet.email()
    const telephone = registrationCredentials.telephone
    const password = registrationCredentials.password
    const confirmPassword = registrationCredentials.confirmPassword

    cy.register(firstname, lastname, email, telephone, password, confirmPassword)
    cy.get('input[name="agree"]').check()
    cy.get('input[name="newsletter"]').check('0')
    cy.submitForm()
    cy.openCategory('Phones & PDAs')

    let productNames = []
    cy.getProductNames().each(value => {
      const productName = value.text()
      productNames.push(productName)
    })

    cy.get('body').then(() => {
      for (let i = 0; i < productNames.length; i++) {
        cy.get('#content .product-thumb button[onclick*="wishlist.add"]').eq(i).click()
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(1000)
        cy.get('.alert').contains('Success: You have added ' + productNames[i] + ' to your wish list!')
      }
    })

    cy.openWishList()

    cy.get('body').then(() => {
      for (let i = 0; i < productNames.length; i++) {
        cy.get('#content .text-left a').contains(productNames[i]).should('be.visible')
      }
    })
  })

  it('A user can add a product to the comparison list', () => {
    cy.openCategory('Phones & PDAs')

    let productNames = []
    cy.getProductNames().each(value => {
      const productName = value.text()
      productNames.push(productName)
    })

    cy.get('body').then(() => {
      for (let i = 0; i < productNames.length; i++) {
        cy.get('#content .product-thumb button[onclick*="compare.add"]').eq(i).click()
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(1000)
        cy.get('.alert').contains('Success: You have added ' + productNames[i] + ' to your product comparison!')
      }
    })

    cy.openComparisonList()

    cy.get('body').then(() => {
      for (let i = 0; i < productNames.length; i++) {
        cy.get('#content td a strong').contains(productNames[i]).should('be.visible')
      }
    })
  })
})

