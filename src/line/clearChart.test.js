/**
 * @jest-environment jsdom
 */


const { waitFor } = require('@testing-library/dom')
const fs = require("fs")
const domTesting = require('@testing-library/dom')
require('@testing-library/jest-dom')
const userEvent = require("@testing-library/user-event").default


function initDomFromFiles(htmlPath, jsPath) {
    const html = fs.readFileSync(htmlPath, 'utf8')
    document.open()
    document.write(html)
    document.close()
    jest.isolateModules(function() {
        require(jsPath)
    })
}


// NOTE: Many of the variables defined in each test are not actually used,
// however its much more efficient for me to copy and paste them per test.


test("testing clearing chart labels", async function () {
    // Arrange:
    initDomFromFiles(
    `${__dirname}/line.html`,
    `${__dirname}/line.js`
    )
    // The clear chart button
    const clearChartButton = document.getElementById("clear-chart-btn")


    // X and Y Label Inputs (By ID)
    const chartXLabelInput = document.getElementById("x-label-input")
    const chartYLabelInput = document.getElementById("y-label-input")
   


    // Act:
    const inputXLabel = "XAxis"
    const inputYLabel = "YAxis"
    const user = userEvent.setup()
    await user.type(chartXLabelInput, inputXLabel)
    await user.type(chartYLabelInput, inputYLabel)


    // Assert:  
    expect(chartXLabelInput.value).toBe("XAxis")
    expect(chartYLabelInput.value).toBe("YAxis")


    // Act2:
    await user.click(clearChartButton)


    // Assert2:
    expect(chartXLabelInput.value).toBe("")
    expect(chartYLabelInput.value).toBe("")


    })


test("testing clearing data points", async function () {
    // Arrange:
    initDomFromFiles(
    `${__dirname}/line.html`,
    `${__dirname}/line.js`
    )
    // The clear chart button
    const clearChartButton = document.getElementById("clear-chart-btn")


    // X and Y Value Inputs (By Class)
    const xValueInputs = document.getElementsByClassName("x-value-input")
    const yValueInputs = document.getElementsByClassName("y-value-input")
   


    // Act:
    const inputX1 = "1"
    const inputY1 = "2"
    const user = userEvent.setup()
    await user.type(xValueInputs[0], inputX1)
    await user.type(yValueInputs[0], inputY1)


    // Assert:
    expect(xValueInputs[0].value).toBe("1")
    expect(yValueInputs[0].value).toBe("2")


    // Act2:
    await user.click(clearChartButton)


    // Assert2:
    expect(xValueInputs[0].value).toBe("")
    expect(yValueInputs[0].value).toBe("")


    })


test("testing clearing multiple data points", async function () {
    // Arrange:
    initDomFromFiles(
    `${__dirname}/line.html`,
    `${__dirname}/line.js`
    )
    // The "+" add values button
    const addValuesButton = document.getElementById("add-values-btn")
    // The clear chart button
    const clearChartButton = document.getElementById("clear-chart-btn")
   
    const user = userEvent.setup()
    await user.click(addValuesButton)
    await user.click(addValuesButton)


    // X and Y Value Inputs (By Class)
    const xValueInputs = document.getElementsByClassName("x-value-input")
    const yValueInputs = document.getElementsByClassName("y-value-input")


    // Act:
    const inputX1 = "1"
    const inputY1 = "2"
    const inputX2 = "3"
    const inputY2 = "4"
    const inputX3 = "5"
    const inputY3 = "6"
    await user.type(xValueInputs[0], inputX1)
    await user.type(yValueInputs[0], inputY1)
    await user.type(xValueInputs[1], inputX2)
    await user.type(yValueInputs[1], inputY2)
    await user.type(xValueInputs[2], inputX3)
    await user.type(yValueInputs[2], inputY3)


    // Assert:
    expect(xValueInputs[0].value).toBe("1")
    expect(yValueInputs[0].value).toBe("2")
    expect(xValueInputs[1].value).toBe("3")
    expect(yValueInputs[1].value).toBe("4")
    expect(xValueInputs[2].value).toBe("5")
    expect(yValueInputs[2].value).toBe("6")


    // Act2:
    await user.click(clearChartButton)


    // Assert2:
    expect(xValueInputs[0].value).toBe("")
    expect(yValueInputs[0].value).toBe("")
    // The following input elements no longer exist after the clear.
    expect(xValueInputs[1]).toBeUndefined()
    expect(yValueInputs[1]).toBeUndefined()
    expect(xValueInputs[2]).toBeUndefined()
    expect(yValueInputs[2]).toBeUndefined()


    })


test("testing clearing chart title", async function () {
    // Arrange:
    initDomFromFiles(
    `${__dirname}/line.html`,
    `${__dirname}/line.js`
    )
    // The clear chart button
    const clearChartButton = document.getElementById("clear-chart-btn")


    // Chart Title Input ()
    const chartTitleInput = document.getElementById("chart-title-input")
   
    // Act:
    const inputTitle = "MyFavoriteChart"
    const user = userEvent.setup()
    await user.type(chartTitleInput, inputTitle)


    // Assert:  
    expect(chartTitleInput.value).toBe("MyFavoriteChart")


    // Act2:
    await user.click(clearChartButton)


    // Assert2:
    expect(chartTitleInput.value).toBe("")


    })


test("testing clearing chart color", async function () {
    // Arrange:
    initDomFromFiles(
    `${__dirname}/line.html`,
    `${__dirname}/line.js`
    )
    // The clear chart button
    const clearChartButton = document.getElementById("clear-chart-btn")


    // ChartColorInput
    const chartColorInput = document.getElementById("chart-color-input")
   


    // Act:
    const inputColor = "#ec83ae" // Light Pink :D
    const user = userEvent.setup()
    // await user.type(chartColorInput, inputColor)
    chartColorInput.value = inputColor


    // Assert:  
    expect(chartColorInput.value).toBe("#ec83ae")


    // Act2:
    await user.click(clearChartButton)


    // Assert2:
    expect(chartColorInput.value).toBe("#ff4500")


    })


    test("testing clearing all chart data", async function () {
        // Arrange:
        initDomFromFiles(
        `${__dirname}/line.html`,
        `${__dirname}/line.js`
        )
        // The "+" add values button
        const addValuesButton = document.getElementById("add-values-btn")
        // The clear chart button
        const clearChartButton = document.getElementById("clear-chart-btn")
        // X and Y Label Inputs (By ID)
        const chartXLabelInput = document.getElementById("x-label-input")
        const chartYLabelInput = document.getElementById("y-label-input")
        // Chart Title Input ()
        const chartTitleInput = document.getElementById("chart-title-input")
        // Chart Color Input
        const chartColorInput = document.getElementById("chart-color-input")
       
        const user = userEvent.setup()
        await user.click(addValuesButton)
        await user.click(addValuesButton)
   
        // X and Y Value Inputs (By Class)
        const xValueInputs = document.getElementsByClassName("x-value-input")
        const yValueInputs = document.getElementsByClassName("y-value-input")
   




        // Act:
        const inputX1 = "1"
        const inputY1 = "2"
        const inputX2 = "3"
        const inputY2 = "4"
        const inputX3 = "5"
        const inputY3 = "6"
        const inputXLabel = "XAxis"
        const inputYLabel = "YAxis"
        const inputTitle = "MyFavoriteChart"
        const inputColor = "#ec83ae"
        await user.type(xValueInputs[0], inputX1)
        await user.type(yValueInputs[0], inputY1)
        await user.type(xValueInputs[1], inputX2)
        await user.type(yValueInputs[1], inputY2)
        await user.type(xValueInputs[2], inputX3)
        await user.type(yValueInputs[2], inputY3)
        await user.type(chartXLabelInput, inputXLabel)
        await user.type(chartYLabelInput, inputYLabel)
        await user.type(chartTitleInput, inputTitle)
        chartColorInput.value = inputColor
   
        // Assert:
        expect(xValueInputs[0].value).toBe("1")
        expect(yValueInputs[0].value).toBe("2")
        expect(xValueInputs[1].value).toBe("3")
        expect(yValueInputs[1].value).toBe("4")
        expect(xValueInputs[2].value).toBe("5")
        expect(yValueInputs[2].value).toBe("6")
        expect(chartXLabelInput.value).toBe("XAxis")
        expect(chartYLabelInput.value).toBe("YAxis")
        expect(chartTitleInput.value).toBe("MyFavoriteChart")
        expect(chartColorInput.value).toBe("#ec83ae")
   
        // Act2:
        await user.click(clearChartButton)
   
        // Assert2:
        // Chart Points
        expect(xValueInputs[0].value).toBe("")
        expect(yValueInputs[0].value).toBe("")
        // The following input elements no longer exist after the clear.
        expect(xValueInputs[1]).toBeUndefined()
        expect(yValueInputs[1]).toBeUndefined()
        expect(xValueInputs[2]).toBeUndefined()
        expect(yValueInputs[2]).toBeUndefined()
        // Chart Labels
        expect(chartXLabelInput.value).toBe("")
        expect(chartYLabelInput.value).toBe("")
        // Chart Title
        expect(chartTitleInput.value).toBe("")
        // Chart Color
        expect(chartColorInput.value).toBe("#ff4500")
        })

