describe('Blog ', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'username',
      password: 'password',
      name: 'name',
    }
    const user2 = {
      username: 'username2',
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
      cy.get('#titleInput').clear()
      cy.get('#authorInput').clear()
      cy.get('#urlInput').clear()
      cy.get('#titleInput').type('testTitle2')
      cy.get('#authorInput').type('testAuthor2')
      cy.get('#urlInput').type('testsUrl2')
      cy.get('#submitButton').click()
      cy.get('#titleInput').clear()
      cy.get('#authorInput').clear()
      cy.get('#urlInput').clear()
    })

    it('a new blog can be created', function() {
      cy.get('#titleInput').type('cypressTitle')
      cy.get('#authorInput').type('cypressAuthor')
      cy.get('#urlInput').type('cypressUrl')
      cy.get('#submitButton').click()
      cy.get('#titleInput').clear()
      cy.get('#authorInput').clear()
      cy.get('#urlInput').clear()

      cy.contains('cypressTitle')
    })

    it('blogs can be liked', function() {
      cy.get('.blog').contains('testTitle2').parent().find('.viewButton').click()
      cy.get('.blog').contains('testTitle2').parent().find('.likeButton').click()
    })

    it('blogs can be removed', function() {
      cy.get('.blog').contains('testTitle2').parent().find('.viewButton').click()
      cy.get('.blog').contains('testTitle2').parent().find('#removeButton').click()
      cy.get('.notification').should('contain', 'removed blog testTitle2')
    })

    it('blogs are sorted by likes', function() {
      cy.get('.blog').contains('testTitle2').parent().find('.viewButton').click()
      cy.get('.blog').contains('testTitle2').parent().find('.likeButton').click()
      cy.get('.blog:first').should('contain', 'testTitle2')
    })
  })

  describe('when logged in as wrong user', function() {
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
      cy.get('#logoutButton').click()
    })

    it('blog cannot be removed', function() {
      cy.get('#usernameInput').type('username2')
      cy.get('#passwordInput').type('password')
      cy.get('#loginButton').click()

      cy.get('.viewButton').click()
      cy.get('#removeButton').should('not.be.visible');
    })
  })
})