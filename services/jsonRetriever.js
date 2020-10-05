import axios from 'axios'

export default {
  /**
   * This is an asynchronous function that collects all json data for a given country.
   * Then builds a competition tree and sets up the filters on the vue page. This function
   * should only be called when changing country to display or when creating the vue page.
   */
  async buildCompetitionData(selectedCountry) {
    var competitions = []
    // Creates a outer promise (an asynchronous function) that we will
    // wait to finish.
    let outerPromise = new Promise((resolve, reject) => {
      // Creates a lists of inner promises (asynchronous axios calls) based on
      // the number of JSON data URLs in the selected country.
      var innerPromises = []
      selectedCountry.urls.forEach((jsonUrl) => {
        innerPromises.push(axios.get(jsonUrl))
      })

      // Runs each inner promise, then once all inner promises are complete,
      // send a message to let the code waiting know the outer promise is done.
      Promise.all(innerPromises).then(function (results) {
        results.forEach(function (response) {
          // Gets the json data and adds it to the list of competitions.
          console.log(response.data)
          competitions.push(response.data)
        })
        resolve('done')
      })
    })

    // The code waits here for the outer promise to finish before continueing.
    await outerPromise

    // Flatterns the competitions as after the promise it
    // contains an array as an element for each json url called.
    return competitions.flat()
  },
}
