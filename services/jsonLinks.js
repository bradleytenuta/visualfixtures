/**
 * This file exports a different object for each sport supported by visual fixtures.
 * Each object contains a list of countries. Each object within the country array contains
 * a country code for that country and another list of JSON urls. These URLS are links to
 * JSON files which contain compeititons to display. The format provided should be copied for
 * each country object within a sport.
 *
 * [sport] {
 *  countries: [
 *    countryCode: [ISO Country Code],
 *    urls: [
 *      ...,
 *      ...
 *    ]
 *  ]
 * }
 *
 */

export const athletics = {
  countries: [
    {
      countryCode: 'GBR',
      urls: [
        'https://file.opentrack.run/live/euroath/domestic_calendar_gbr_2020.json',
        'https://file.opentrack.run/live/euroath/domestic_calendar_gbr_2021.json',
      ],
    },
  ],
}
