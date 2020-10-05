// A mock list of competitions
export const mockCompeitions = [
  {
    id: '1877b684-479c-4e17-a776-53b2474325d6',
    is_demo: false,
    date: '2020-01-04',
    full_name: 'South London Athletic Network Open Meeting',
    num_competitors: 233,
    finish_date: '2020-01-04',
    type: 'INDOOR',
    age_groups: '',
    address: 'David Weir Arena Middleton Road Carshalton Surrey',
    entry_link: '',
    contact_details: 'ben@bennoadcoaching.com',
    latitude: null,
    longitude: null,
    dirtyProperty: 'Should be cleaned',
  },
  {
    id: '56d94401-1c2a-47a2-9118-cdcce65a3f48',
    is_demo: false,
    date: '2020-01-05',
    full_name: 'Buckinghamshire Cross Country Championships',
    num_competitors: 295,
    finish_date: '2020-01-05',
    type: 'CROSSCOUNTRY',
    age_groups: '',
    address: 'Shuttleworth, Old Warden Park, Biggleswade',
    entry_link: '',
    contact_details: 'test@example.com',
    latitude: 52.0851,
    longitude: -0.3267,
    dirtyProperty: 'Should be cleaned',
  },
]

// A mock of a single compeititon
export const mockCompetition = {
  id: '1877b684-479c-4e17-a776-53b2474325d6',
  is_demo: false,
  date: '2020-01-04',
  full_name: 'South London Athletic Network Open Meeting',
  num_competitors: 233,
  finish_date: '2020-01-04',
  type: 'INDOOR',
  age_groups: '',
  address: 'David Weir Arena Middleton Road Carshalton Surrey',
  entry_link: '',
  contact_details: 'ben@bennoadcoaching.com',
  latitude: null,
  longitude: null,
  dirtyProperty: 'Should be cleaned',
}

// Mock of country array
export const mockedCountries = [
  {
    countryCode: 'IMN',
    urls: ['www.someurl.com'],
  },
  {
    countryCode: 'ALB',
    urls: ['www.someurl.com'],
  },
  {
    countryCode: 'GBR',
    urls: ['www.someurl.com'],
  },
]

// Mock of sport pages.
export const mockedSport = 'athletics'

// Mock of competition tree.
export const mockCompetitionTree = [
  {
    competitions: mockCompeitions,
    month: 'January 2020',
  },
]
