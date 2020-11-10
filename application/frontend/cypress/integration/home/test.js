describe('Test covid data', () => {
    it('click on Fresco county', () => {
        cy.viewport(1920, 1080)
        cy.visit('http://ec2-15-237-111-31.eu-west-3.compute.amazonaws.com:3001/')

        cy.get('.PrivateSwitchBase-input-4').click()
        cy.get('body').click(1500, 700)
        cy.contains('Fresno')
    })
})

describe('Test Fire data', () => {
    it('click on Fresco county', () => {
        cy.viewport(1920, 1080)
        cy.visit('http://ec2-15-237-111-31.eu-west-3.compute.amazonaws.com:3001/')

        cy.get('body').click(1500, 700)
        cy.contains('Frame Fire')
        cy.contains('Trimmer Fire')
        cy.contains('Hills Fire')
        cy.contains('Hog Fire')
        cy.contains('Bullfrog Fire')
        cy.contains('Sycamore Fire')
        cy.contains('Kings Fire')
        cy.contains('Mineral Fire')
        cy.contains('Mud Fire')

    })
})

describe('Test redirect to login', () => {
    it('click the signup button', () => {
        cy.viewport(1920, 1080)
        cy.visit('http://ec2-15-237-111-31.eu-west-3.compute.amazonaws.com:3001/')
        cy.get('.signUp').click()
        cy.url().should('include', '/signup')
    })
})
