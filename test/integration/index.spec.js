const { Builder, By } = require('selenium-webdriver')

// This loads the dotenv library and calls the config function which loads the
// variables in the .env file to process.env variable.
require('dotenv').config()

// Loads the private keys from the .env file.
var USERNAME = process.env.BROWSERSTACK_USERNAME
var AUTOMATE_KEY = process.env.BROWSERSTACK_AUTOMATE_KEY
var browserstackURL = 'https://' + USERNAME + ':' + AUTOMATE_KEY + '@hub-cloud.browserstack.com/wd/hub'

// A new timeout is needed for these tests as they will run longer than jest expects.
jest.setTimeout(30000)

/**
 * Test Suite for integration tests on the index page.
 */
describe('Index Page - Integration tests', () => {
  let driver

  /**
   * Creates the driver for each test. This means a different recording is made for every
   * test.
   */
  beforeEach(async () => {
    // The capability options for each test.
    var capabilities = {
      os: 'Windows',
      os_version: '10',
      browserName: 'Chrome',
      browser_version: '80',
      // Uses the test name here. Helps to filter the tests on the BrowserStack Dashboard.
      name: expect.getState().currentTestName,
    }

    driver = new Builder().usingServer(browserstackURL).withCapabilities(capabilities).build()
    await driver.get('https://visualfixturestest.web.app')
  })

  /**
   * After each test the driver is destroyed ready for the next one to be created for the
   * next test.
   */
  afterEach(async () => {
    await driver.quit()
  })

  /**
   * Tests the help modal can be opened and closed.
   */
  test('Footer - Modal Help open and close', async () => {
    // Finds the modal button with the given id.
    await driver.findElement(By.id('modalHelpButton')).click()

    // Checks that a modal is visible. A modal is only added to the html once it has been
    // clicked. So its safe to assume only one modal will exist in html.
    expect(await driver.findElement(By.css('.v-dialog__content')).isDisplayed()).toBeTruthy()
  })

  /**
   * Tests the contribute modal can be opened and closed.
   */
  test('Footer - Modal Contribute open and close', async () => {
    // Finds the modal button with the given id.
    await driver.findElement(By.id('modalContributeButton')).click()

    // Checks that a modal is visible. A modal is only added to the html once it has been
    // clicked. So its safe to assume only one modal will exist in html.
    expect(await driver.findElement(By.css('.v-dialog__content')).isDisplayed()).toBeTruthy()
  })
})
