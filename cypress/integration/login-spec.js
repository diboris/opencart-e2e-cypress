describe('Login Flow', () => {
  let loginCredentials

  beforeEach(() => {
    cy.visit('account/login')
    cy.fixture('loginCredentials').then(function (user) {
      loginCredentials = user
    })
  })

  it('A user can login', () => {
    const email = loginCredentials.email
    const password = loginCredentials.password

    cy.login(email, password)

    cy.get('h2').contains('My Orders')
      .should('be.visible')
  })

  it('A user can logout', () => {
    const email = loginCredentials.email
    const password = loginCredentials.password

    cy.login(email, password)
    cy.get('a').contains('My Account').click()
    cy.get('a').contains('Logout').click()

    cy.get('p').contains('You have been logged off your account. It is now safe to leave the computer.')
      .should('be.visible')
  })

  it('A user can not login with no data', () => {
    cy.submitForm()

    cy.assertAlertMessage(' Warning: No match for E-Mail Address and/or Password.')
  })

  it('A user can not login with invalid password', () => {
    const email = loginCredentials.email
    const password = loginCredentials.invalidPassword

    cy.login(email, password)

    cy.assertAlertMessage(' Warning: No match for E-Mail Address and/or Password.')
  })

  it('A user can reset the password', () => {
    const email = loginCredentials.email

    cy.get('a').contains('Forgotten Password').click()
    cy.get('#input-email').type(email)
    cy.submitForm()

    cy.assertAlertMessage(' An email with a confirmation link has been sent your email address.')
  })
})
