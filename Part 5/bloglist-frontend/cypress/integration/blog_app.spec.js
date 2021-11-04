describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            name: 'Matti Luukkainen',
            username: 'mluukkai',
            password: 'salainen'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.visit('http://localhost:3000')
    })

    describe('when logged out', function () {
        it('Login form is shown', function() {
            cy.contains('login to application')
        })

        it('user can login', function() {
            cy.get('input:first').type('mluukkai')
            cy.get('input:last').type('salainen')
            cy.contains('log in').click()
            cy.contains('logged in')
        })

        it('login fails if details are incorrect', function() {
            cy.get('input:first').type('mluukkai')
            cy.get('input:last').type('qwerty')
            cy.contains('log in').click()
            //check for notification message
            cy.contains('Invalid username or password')
            //does NOT contain logged in message
            cy.get('html').should('not.contain', 'logged in')
        })
    })

    describe('when logged in', function () {
        beforeEach( function () {
            cy.login({ username: 'mluukkai', password: 'salainen' })
        })

        it('can create a new blog', function () {
            cy.contains('Add blog').click()
            cy.get('#title').type('myBlog')
            cy.get('#author').type('myAuthor')
            cy.get('#url').type('myUrl.com')
            cy.contains('Add blog').click()
            cy.contains('myBlog myAuthor')
        })

        describe('when one blog exists', function() {
            beforeEach(function() {
                //command to add a blog
                cy.addBlog({
                    title: 'newTitle', author: 'newAuthor', url: 'newUrl.com'
                })
                //view created blog's details and like the blog
                cy.contains('view').click()
            })

            it('user can like a blog', function() {
                //click like button and check if incremented
                cy.contains('like').click()
                cy.contains('likes: 1')
            })

            it('user who created blog can delete it', function() {
                //click delete button and check for deleted notification
                cy.contains('Delete').click()
                cy.contains('Deleted blog')
            })
        })

        describe('when multiple blogs exist', function () {
            beforeEach(function() {
                cy.login({ username: 'mluukkai', password: 'salainen' })
                //command to add a blog
                cy.addBlog({
                    title: 'newTitle',
                    author: 'newAuthor',
                    url: 'newUrl.com',
                    likes: 10
                })
                cy.addBlog({
                    title: 'unpopularBlog',
                    author: 'oldAuthor',
                    url: 'oldUrl.com',
                    likes: 0
                })
                cy.addBlog({
                    title: 'averageBlog',
                    author: 'averageAuthor',
                    url: 'averageUrl.com',
                    likes: 5
                })

                //open blog details
                cy.contains('view').click()
                cy.contains('view').click()
                cy.contains('view').click()
            })

            it('blogs are ordered by likes', function () {
                cy.get('.likeDiv')
                    .invoke('text')
                    .then((text) => {
                        expect(text).to.eq('likes: 10 likelikes: 5 likelikes: 0 like')
                    })
            })
        })
    })
})
