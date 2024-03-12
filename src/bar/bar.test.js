/**
 * @jest-environment jsdom
 */

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

describe('Adding values', () => {
    test('Clicking add should add new X,Y input pairs', async () => {
        // Load html & js
        initDomFromFiles(`${__dirname}/bar.html`,
            `${__dirname}/bar.js`)

        // Get X,Y value inputs
        let xs = domTesting.getAllByLabelText(document, 'X')
        let ys = domTesting.getAllByLabelText(document, 'Y')

        // Assert X,Y value inputs correctly initialized
        expect(xs.length).toBe(1)
        expect(ys.length).toBe(1)
        expect(xs[0].value).toBe('')
        expect(ys[0].value).toBe('')

        // Get plus button
        const addButton = domTesting.getByRole(document, 'button', {name: '+'})

        // Click plus button
        const user = userEvent.setup()
        await user.click(addButton)

        // Refresh X,Y value inputs
        xs = domTesting.getAllByLabelText(document, 'X')
        ys = domTesting.getAllByLabelText(document, 'Y')

        // Assert another X,Y input pair was added
        expect(xs.length).toBe(2)
        expect(ys.length).toBe(2)
        expect(xs[1].value).toBe('')
        expect(ys[1].value).toBe('')

        // Click plus button again
        await user.click(addButton)

        // Refresh X,Y value inputs
        xs = domTesting.getAllByLabelText(document, 'X')
        ys = domTesting.getAllByLabelText(document, 'Y')

        // Assert another X,Y input pair was added
        expect(xs.length).toBe(3)
        expect(ys.length).toBe(3)
        expect(xs[2].value).toBe('')
        expect(ys[2].value).toBe('')
    })

    test('Clicking add should not change existing values', async () => {
        // Load html & js
        initDomFromFiles(`${__dirname}/../bar/bar.html`,
            `${__dirname}/../bar/bar.js`)

        // Get X,Y value inputs
        let xs = domTesting.getAllByLabelText(document, 'X')
        let ys = domTesting.getAllByLabelText(document, 'Y')

        // Enter values for X1 and Y1
        const user = userEvent.setup()
        await user.type(xs[0], '1')
        await user.type(ys[0], '2')

        // Get plus button
        const addButton = domTesting.getByRole(document, 'button', {name: '+'})

        // Click plus button
        await user.click(addButton)

        // Refresh X,Y value inputs
        xs = domTesting.getAllByLabelText(document, 'X')
        ys = domTesting.getAllByLabelText(document, 'Y')

        // Assert that existing values were not modified
        expect(xs[0].value).toBe('1')
        expect(ys[0].value).toBe('2')

        // Enter values for X2, but leave Y2 empty
        await user.type(xs[1], '3')

        // Click plus button again
        await user.click(addButton)

        // Refresh X,Y value inputs
        xs = domTesting.getAllByLabelText(document, 'X')
        ys = domTesting.getAllByLabelText(document, 'Y')

        // Assert that existing values were not modified
        expect(xs[0].value).toBe('1')
        expect(ys[0].value).toBe('2')
        expect(xs[1].value).toBe('3')
        expect(ys[1].value).toBe('')
    })
})
