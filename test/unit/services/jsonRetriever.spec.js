import axios from 'axios'

describe('externalApiConnectionCheck', () => {
  // Tests the opentrack json api is working.
  test('OpenTrack - GBR 2020', () => {
    const url = 'https://file.opentrack.run/live/euroath/domestic_calendar_gbr_2020.json'

    axios
      .get(url)
      .then((response) => {
        expect(response.data).toBeDefined()
        expect(Array.isArray(response.data)).toBeTruthy()
      })
      .catch((err) => {
        throw new Error('Json data could not be found from: ' + url)
      })
  })

  // Tests the opentrack json api is working.
  test('OpenTrack - GBR 2021', () => {
    const url = 'https://file.opentrack.run/live/euroath/domestic_calendar_gbr_2021.json'

    axios
      .get(url)
      .then((response) => {
        expect(response.data).toBeDefined()
        expect(Array.isArray(response.data)).toBeTruthy()
      })
      .catch((err) => {
        throw new Error('Json data could not be found from: ' + url)
      })
  })
})

// TODO: Find way to test actual jsonRetriever function.
