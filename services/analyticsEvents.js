/**
 * This event name is used when a new country is selected.
 * It should be placed somewhere that watches for a change in the
 * selected country. Below is the parameters that should be included in this
 * event.
 *
 * logEvent('country_select', {
 *   country_code:
 *   sport_name:
 * })
 */
export const selectedCountryEventName = 'country_select'

/**
 * This event name is used when a new competition is selected.
 * It should be placed somewhere that watches for a change in the
 * selected competition. Below is the parameters that should be included in this
 * event.
 *
 * logEvent('competition_select', {
 *   competition_id:
 *   country_code:
 *   sport_name:
 * })
 */
export const selectedCompetitionEventName = 'competition_select'

/**
 * This event name is used when the user has clicked the list dropdown button.
 * Below is the parameters that should be included in this event.
 *
 * logEvent('list_dropdown_click', {
 *   dropdown_state:
 * })
 */
export const listDropdownEventName = 'list_dropdown_click'

/**
 * This event name is used when the user has clicked the filter dropdown button.new competition is selected.
 * Below is the parameters that should be included in this event.
 *
 * logEvent('filter_dropdown_click', {
 *   dropdown_state:
 * })
 */
export const filterDropdownEventName = 'filter_dropdown_click'

/**
 * This event name is used when the user has clicked the card share button.
 * Below is the parameters that should be included in this event.
 *
 * logEvent('card_share_click', {
 *   competition_id:
 *   country_code:
 *   sport_name:
 * })
 */
export const cardShareEventName = 'card_share_click'

/**
 * This event name is used when the user has clicked the card contact button.
 * Below is the parameters that should be included in this event.
 *
 * logEvent('card_contact_click', {
 *   competition_id:
 *   country_code:
 *   sport_name:
 * })
 */
export const cardContactEventName = 'card_contact_click'

/**
 * This event name is used when the user has clicked the card location button.
 * Below is the parameters that should be included in this event.
 *
 * logEvent('card_location_click', {
 *   competition_id:
 *   country_code:
 *   sport_name:
 * })
 */
export const cardLocationEventName = 'card_location_click'

/**
 * This event name is used when the user has clicked to view bradley's buymeacoffee page.
 * Below is the parameters that should be included in this event.
 *
 * logEvent('buy_me_a_coffee_link_click')
 */
export const buyMeACoffeeEventName = 'buy_me_a_coffee_link_click'

/**
 * This event name is used when the user has clicked to view the help modal.
 * Below is the parameters that should be included in this event.
 *
 * logEvent('modal_help_click')
 */
export const modalHelpEventName = 'modal_help_click'

/**
 * This event name is used when the user has clicked to view the contribute modal.
 * Below is the parameters that should be included in this event.
 *
 * logEvent('modal_contribute_click')
 */
export const modalContributeEventName = 'modal_contribute_click'
