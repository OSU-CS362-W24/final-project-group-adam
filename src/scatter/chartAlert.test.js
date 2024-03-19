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

// In your test, you can clear the mock before each test to ensure a clean state
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

    /*

    test("alert message when no x and y input", async() => {

        

        initDomFromFiles(`${__dirname}/scatter.html`,`${__dirname}/scatter.js`)

        const yInputElement = document.createElement('input');
        yInputElement.setAttribute('type', 'number');
        yInputElement.classList.add('y-value-input');
        document.body.appendChild(yInputElement);

        const xInputElement = document.createElement('input');
        xInputElement.setAttribute('type', 'number');
        xInputElement.classList.add('x-value-input');
        document.body.appendChild(xInputElement);

        const spy = jest.spyOn(window, "alert")

        //generate chart button, x & y label inputs
        const button = document.getElementById("generate-chart-btn")
        const xInput = document.querySelector('input.x-value-input[type="number"]');
        const yInput = document.querySelector('input.y-value-input[type="number"]');

        const user = userEvent.setup()
        await user.type(xInput, "1")
        await user.type(yInput, "2")
        await user.click(button)
        
        const alert = spy.mock.lastCall[0]

        expect(alert).toBe("Error: Must specify a label for both X and Y!")
    })

    */
})