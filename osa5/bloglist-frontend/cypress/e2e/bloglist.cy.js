describe('Blog ', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'username',
      password: 'password',
      name: 'name',
    }
    const user2 = {
      username: 'user2',
      password: 'password',
      name: 'name2'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.request('POST', 'http://localhost:3003/api/users/', user2)
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.get('#usernameInput').type('lol')
    cy.contains('login')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function () {
      cy.get('#usernameInput').type('username')
      cy.get('#passwordInput').type('password')
      cy.get('#loginButton').click()
  
      cy.get('#loggedInAs').contains('Logged in as')
    })
  
    it('fails with wrong password', function() {
      cy.get('#usernameInput').type('username')
      cy.get('#passwordInput').type('wrong')
      cy.get('#loginButton').click()
  
      cy.get('.notification').contains('Wrong credentials')
    })
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.get('#usernameInput').type('username')
      cy.get('#passwordInput').type('password')
      cy.get('#loginButton').click()

      cy.get('#newBlogButton').click()
      cy.get('#titleInput').type('testTitle')
      cy.get('#authorInput').type('testAuthor')
      cy.get('#urlInput').type('testsUrl')
      cy.get('#submitButton').click()
      cy.get('#cancelButton').click()
    })

    it('a new blog can be created', function() {
      cy.get('#newBlogButton').click()
      cy.get('#titleInput').type('cypressTitle')
      cy.get('#authorInput').type('cypressAuthor')
      cy.get('#urlInput').type('cypressUrl')
      cy.get('#submitButton').click()

      cy.contains('cypressTitle')
    })

    it('blogs can be liked', function() {
      cy.get('.viewButton').click()
      cy.get('.likeButton').click()
      cy.get('#likeCount').contains(1)
    })

    it('blogs can be removed', function() {
      cy.get('.viewButton').click()
      cy.get('#removeButton').click()
      cy.get('.blog').should('not.exist');
    })
  })
})