it('Chart is saved to gallery', () => {
    cy.visit('/line.html')


    // Assert chart doesn't exist before it's generated
    cy.findByRole('img').should('not.exist')


    // Input chart title and axis labels
    cy.findByLabelText('Chart title').type('Cats vs. Dogs')
    cy.findByLabelText('X label').type('Cats')
    cy.findByLabelText('Y label').type('Dogs')


    // Set chart color
    // Color inputs open native dialogs, so we have to just set the value
    // manually, see https://github.com/cypress-io/cypress/issues/7812
    cy.findByLabelText('Chart color').invoke('val', '#0000ff').trigger('change')


    // Input chart data
    cy.findAllByLabelText('X').last().type('1')
    cy.findAllByLabelText('Y').last().type('3')
    cy.findByRole('button', { name: '+' }).click()
    cy.findAllByLabelText('X').last().type('2')
    cy.findAllByLabelText('Y').last().type('7')
    cy.findByRole('button', { name: '+' }).click()
    cy.findAllByLabelText('X').last().type('3')
    cy.findAllByLabelText('Y').last().type('15')
    cy.findByRole('button', { name: '+' }).click()
    cy.findAllByLabelText('X').last().type('4')
    cy.findAllByLabelText('Y').last().type('25')
    cy.findByRole('button', { name: '+' }).click()
    cy.findAllByLabelText('X').last().type('5')
    cy.findAllByLabelText('Y').last().type('40')


    // Generate chart
    cy.findByRole('button', { name: 'Generate chart'}).click()


    // Generate chart
    cy.findByRole('button', { name: 'Save chart'}).click()


    // Click the Gallery
    cy.findByRole('link', { name: 'Gallery'}).click()


    // Assert that the title of the graph appears
    cy.findByText('Cats vs. Dogs').should('exist')


})



