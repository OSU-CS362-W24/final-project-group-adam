it('Chart data is maintained across pages', () => {
    cy.visit('/line.html')


    // Assert chart doesn't exist before it's generated
    cy.findByRole('img').should('not.exist')


    // Input chart title and axis labels
    cy.findByLabelText('Chart title').type('Cats vs. Dogs')
    cy.findByLabelText('X label').type('Cats')
    cy.findByLabelText('Y label').type('Dogs')


    // Set chart color
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
    cy.findByRole('button', { name: '+' }).click()

    //go to another chart
    cy.visit('/bar.html')

    //check if chart title and x/y label are the same
    cy.findByLabelText('Chart title').should('have.value', 'Cats vs. Dogs')

    cy.findByLabelText('X label').should('have.value', 'Cats')
    cy.findByLabelText('Y label').should('have.value', 'Dogs')

    //check if data inputs are the same
    cy.findAllByLabelText('X').eq(0).should('have.value', '1')
    cy.findAllByLabelText('Y').eq(0).should('have.value', '3')

    cy.findAllByLabelText('X').eq(1).should('have.value', '2')
    cy.findAllByLabelText('Y').eq(1).should('have.value', '7')

    cy.findAllByLabelText('X').eq(2).should('have.value', '3')
    cy.findAllByLabelText('Y').eq(2).should('have.value', '15')

    cy.findAllByLabelText('X').eq(3).should('have.value', '4')
    cy.findAllByLabelText('Y').eq(3).should('have.value', '25')

    cy.findAllByLabelText('X').eq(4).should('have.value', '5')
    cy.findAllByLabelText('Y').eq(4).should('have.value', '40')


    //check next chart
    cy.visit('/line.html')

    //check if chart title and x/y label are the same
    cy.findByLabelText('Chart title').should('have.value', 'Cats vs. Dogs')

    cy.findByLabelText('X label').should('have.value', 'Cats')
    cy.findByLabelText('Y label').should('have.value', 'Dogs')

    //check if data inputs are the same
    cy.findAllByLabelText('X').eq(0).should('have.value', '1')
    cy.findAllByLabelText('Y').eq(0).should('have.value', '3')

    cy.findAllByLabelText('X').eq(1).should('have.value', '2')
    cy.findAllByLabelText('Y').eq(1).should('have.value', '7')

    cy.findAllByLabelText('X').eq(2).should('have.value', '3')
    cy.findAllByLabelText('Y').eq(2).should('have.value', '15')

    cy.findAllByLabelText('X').eq(3).should('have.value', '4')
    cy.findAllByLabelText('Y').eq(3).should('have.value', '25')

    cy.findAllByLabelText('X').eq(4).should('have.value', '5')
    cy.findAllByLabelText('Y').eq(4).should('have.value', '40')

})
