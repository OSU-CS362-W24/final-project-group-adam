test("finding generateChartImg test success", function(){})

const { error } = require("console");
const fetchMock = require('jest-fetch-mock');
const generateChartImg = require("./generateChartImg");
fetchMock.enableMocks();

describe('generateChartImg', () => {
    //mocked response data for successful API call
    const mockBlob = jest.fn();
    const mockCreateObjectURL = jest.fn(() => 'mockedImageUrl');
    const mockOkResponse = {
      ok: true,
      blob: mockBlob,
    };

    //mocked response data for unsuccessful API call
    const mockErrResponse = {
        ok: false,
        text: jest.fn(() => Promise.resolve('Error message')),
    };

    beforeEach(() => {
        fetchMock.resetMocks();
        global.URL.createObjectURL = mockCreateObjectURL;
    });

    test("Should return a successful chart img URL from the API when all the proper input is present", async function() {
        const type = "line";
        const data = [
            {x: 0, y: 0},
            {x: 2, y: 2},
            {x: 5, y:5}
        ]
        const xLabel = "X";
        const yLabel = "Y";
        const title = "myChart";

        //set up mock for successful API response
        fetchMock.mockResolvedValueOnce(mockOkResponse);

        //call the function
        const result = await generateChartImg('line', [{ x: 1, y: 2 }], 'X Axis', 'Y Axis', 'Chart Title', '#ff0000');

        //assertions
        expect(result).toBe('mockedImageUrl');
    })

    test('should throw an error when API call is not successful', async () => {
        const type = "line";
        const data = [
            {x: 0, y: 0},
            {x: 2, y: 2},
            {x: 5, y:5}
        ]
        const xLabel = "X";
        const yLabel = "Y";
        const title = "myChart";

        fetchMock.mockResolvedValueOnce(mockErrResponse);

        await expect(generateChartImg(type, data, xLabel, yLabel, title, "Red")).rejects.toThrow('Error message')
    })
})