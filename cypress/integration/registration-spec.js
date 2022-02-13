import faker from 'faker'

describe('Registration Flow', () => {
  let registrationCredentials
  let invalidRegistrationCredentials

  beforeEach(() => {
    cy.fixture('registrationCredentials').then(function (user) {
      registrationCredentials = user
    })
    cy.fixture('invalidRegistrationCredentials').then(function (user) {
      invalidRegistrationCredentials = user
    })
  })

  it('A user can register', () => {
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

    cy.get('h1').contains('Your Account Has Been Created!')
      .should('be.visible')
  })

  it('A user can not register with empty data', () => {
    cy.register()
    cy.submitForm()

    cy.assertErrorMessage('#input-firstname', 'First Name must be between 1 and 32 characters!')
    cy.assertErrorMessage('#input-lastname', 'Last Name must be between 1 and 32 characters!')
    cy.assertErrorMessage('#input-email', 'E-Mail Address does not appear to be valid!')
    cy.assertErrorMessage('#input-telephone', 'Telephone must be between 3 and 32 characters!')
    cy.assertErrorMessage('#input-password', 'Password must be between 4 and 20 characters!')
    cy.get('.alert')
      .should('have.text', ' Warning: You must agree to the Privacy Policy!')
  })

  it('A user can register only with valid email', () => {
    const firstname = invalidRegistrationCredentials.firstname
    const lastname = invalidRegistrationCredentials.lastname
    const email = invalidRegistrationCredentials.email

    cy.register(firstname, lastname, email)
    cy.submitForm()

    cy.assertErrorMessage('#input-email', 'E-Mail Address does not appear to be valid!')
  })

  it('A user can register only with valid telephone', () => {
    const firstname = registrationCredentials.firstname
    const lastname = registrationCredentials.lastname
    const email = registrationCredentials.email
    const telephone = invalidRegistrationCredentials.telephone

    cy.register(firstname, lastname, email, telephone)
    cy.submitForm()

    cy.assertErrorMessage('#input-telephone', 'Telephone must be between 3 and 32 characters!')
  })

  it('A user can register only with valid password', () => {
    const firstname = registrationCredentials.firstname
    const lastname = registrationCredentials.lastname
    const email = registrationCredentials.email
    const password = invalidRegistrationCredentials.password

    cy.register(firstname, lastname, email, password)
    cy.submitForm()

    cy.assertErrorMessage('#input-password', 'Password must be between 4 and 20 characters!')
  })

  it('A user can register only when password confirmation matches the password', () => {
    const firstname = registrationCredentials.firstname
    const lastname = registrationCredentials.lastname
    const email = registrationCredentials.email
    const telephone = registrationCredentials.telephone
    const password = registrationCredentials.password
    const confirmPassword = invalidRegistrationCredentials.confirmPassword

    cy.register(firstname, lastname, email, telephone, password, confirmPassword)
    cy.submitForm()

    cy.assertErrorMessage('#input-confirm', 'Password confirmation does not match password!')
  })
})
