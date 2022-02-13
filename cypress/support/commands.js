import '@testing-library/cypress/add-commands'

Cypress.Commands.add('register', (firstname, lastname, email, telephone, password, confirmPassword) => {
  cy.visit('account/register')
  if (firstname) {
    cy.get('#input-firstname').type(firstname)
  }
  if (lastname) {
    cy.get('#input-lastname').type(lastname)
  }
  if (email) {
    cy.get('#input-email').type(email)
  }
  if (telephone) {
    cy.get('#input-telephone').type(telephone)
  }
  if (password) {
    cy.get('#input-password').type(password)
  }
  if (confirmPassword) {
    cy.get('#input-confirm').type(confirmPassword)
  }
})

Cypress.Commands.add('submitForm', () => {
  cy.get('input[type="submit"]').click()
})

Cypress.Commands.add('assertErrorMessage', (selector, msg) => {
  cy.get(selector).next('.text-danger')
    .should('have.text', msg)
})

Cypress.Commands.add('login', (email, password) => {
  if (email) {
    cy.get('#input-email').type(email)
  }
  if (password) {
    cy.get('#input-password').type(password)
  }
  cy.submitForm()
})

Cypress.Commands.add('assertAlertMessage', (msg) => {
  cy.get('.alert')
    .should('have.text', msg)
})

Cypress.Commands.add('getProductNameFromProductPage', () => {
  return cy.get('#content .product-thumb h4 a').eq(0)
})

Cypress.Commands.add('getProductPriceFromProductPage', () => {
  return cy.get('#content .product-thumb .price').eq(0)
})

Cypress.Commands.add('getProductNameFromCartPage', () => {
  return cy.get('#content tbody tr td a').eq(1)
})

Cypress.Commands.add('getProductPriceFromCartPage', () => {
  return cy.get('#content tbody tr td').eq(4)
})

Cypress.Commands.add('getProductNames', () => {
  return cy.get('#content .product-thumb h4 a')
})

Cypress.Commands.add('getWishListItems', () => {
  return cy.get('#content .product-thumb button[onclick*="wishlist.add"]')
})

Cypress.Commands.add('getWishListNames', () => {
  return cy.get('#content .text-left a')
})

Cypress.Commands.add('getRemoveItemButton', () => {
  return cy.get('tr a[data-original-title="Remove"]')
})

Cypress.Commands.add('openCategory', (text) => {
  cy.get('a').contains(text).click()
})

Cypress.Commands.add('addItemToCart', () => {
  cy.get('#content .product-thumb button[onclick*="cart.add"]').eq(0).click()
})

Cypress.Commands.add('openShoppingCard', () => {
  cy.get('a[title="Shopping Cart"]').click()
})

Cypress.Commands.add('openWishList', () => {
  cy.get('#wishlist-total').click()
})

Cypress.Commands.add('openComparisonList', () => {
  cy.get('#compare-total').click()
})

Cypress.Commands.add('inputContactForm', (name, email, msg) => {
  cy.get('#input-name').type(name)
  cy.get('#input-email').type(email)
  cy.get('#input-enquiry').type(msg)
})
