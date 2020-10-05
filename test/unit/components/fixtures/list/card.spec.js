// Libraries
import Vue from 'vue'
import Vuetify from 'vuetify'

// Components
import card from '~/components/fixtures/list/card'

// Utilities
import { createLocalVue, shallowMount } from '@vue/test-utils'
const vuetify = new Vuetify()
Vue.use(Vuetify)

// Card test suite.
describe('card', () => {
  const localVue = createLocalVue()
  localVue.use(Vuetify)
  // The wrapper Data to be used by all unit tests.
  const mockCompetition = {
    id: '56d94401-1c2a-47a2-9118-cdcce65a3f48',
    is_demo: false,
    date: '2020-01-04',
    full_name: 'Buckinghamshire Cross Country Championships',
    num_competitors: 295,
    finish_date: '2020-01-04',
    type: 'CROSSCOUNTRY',
    age_groups: '',
    address: 'Shuttleworth, Old Warden Park, Biggleswade',
    entry_link: '',
    contact_details: 'test@example.com',
    latitude: 52.0851,
    longitude: -0.3267,
    dirtyProperty: 'Should be cleaned',
  }
  const wrapperData = {
    localVue,
    stubs: {
      NuxtLink: true,
    },
    propsData: {
      competition: mockCompetition,
    },
    vuetify, // For some reason (I dont know) this is required to pass due to mobile breakpoint issue.
  }

  it('should render the card component', () => {
    const wrapper = shallowMount(card, wrapperData)
    expect(wrapper.vm).toBeTruthy()
  })

  // TODO: Unable to test clipboard function as clipboard not found during testing.
})
