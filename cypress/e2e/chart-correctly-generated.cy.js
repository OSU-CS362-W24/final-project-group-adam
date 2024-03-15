it('Chart is correctly generated', () => {
})

it('correctly saves a chart', () =>{
    //use command to generate a chart
    cy.chartGen();

    //save the chart
    cy.findByRole('button', {name: 'Save chart'}).click();

    //nav to gallery
    cy.findByText('Gallery').click();

    //assert that the created chart should be there
    cy.findByRole('img').should('exist');
})
