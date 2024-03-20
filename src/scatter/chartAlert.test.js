/**
 * @jest-environment jsdom
 */

//Akshat Patel:

const fs = require("fs")
const domTesting = require('@testing-library/dom')
require('@testing-library/jest-dom')
const userEvent = require("@testing-library/user-event").default

function initDomFromFiles(htmlPath, jsPath) {
	const html = fs.readFileSync(htmlPath, 'utf8')
	document.open()
	document.write(html)
	document.close()
	require(jsPath)
}

window.alert = jest.fn()
beforeEach(() => {
 window.alert.mockClear()
})


describe("integration test for alert message when no data input", function(){
    test("alert message when no data input", async() => {

        initDomFromFiles(`${__dirname}/scatter.html`,`${__dirname}/scatter.js`)

        const spy = jest.spyOn(window, "alert")

        //generate chart button, x & y label inputs
        const button = document.getElementById("generate-chart-btn")
        const xLabel = document.getElementById("x-label-input")
        const yLabel = document.getElementById("y-label-input")
        
        const user = userEvent.setup()
        await user.type(xLabel, "x")
        await user.type(yLabel, "y")
        await user.click(button)

        const alert = await spy.mock.lastCall[0]

        expect(alert).toBe("Error: No data specified!")
    })

    
    test("alert message when no x and y input", async() => {

        jest.resetModules()
        initDomFromFiles(`${__dirname}/scatter.html`,`${__dirname}/scatter.js`)

        const spy = jest.spyOn(window, "alert")

        //generate chart button, x & y label inputs
        //const button = document.getElementById("generate-chart-btn")
        const button = domTesting.getByRole(document, "button", {name: 'Generate chart'})
        const xLabel = domTesting.getByLabelText(document, "X label")
        const yLabel = domTesting.getByLabelText(document, "Y label")
        const xInput = domTesting.getByLabelText(document, "X ");
        const yInput = domTesting.getByLabelText(document, "Y ")

        expect(xLabel).not.toHaveValue()
        expect(yLabel).not.toHaveValue()

        const user = userEvent.setup()
        await user.type(xInput[0], '1')
        await user.type(yInput[0], '2')
        await user.click(button)

        const alert = spy.mock.lastCall[0]

        expect(alert).toBe("Error: Must specify a label for both X and Y!")
    })

})