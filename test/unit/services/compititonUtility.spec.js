import compititonUtility from '~/services/compititonUtility.js'

describe('compititonUtility', () => {
  // List of mock competitions.
  const mockComps = [
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
      date: '2020-01-04',
      full_name: 'Buckinghamshire Cross Country Championships',
      num_competitors: 295,
      finish_date: '2020-01-04',
      type: 'CROSSCOUNTRY',
      age_groups: '',
      address: 'Shuttleworth, Old Warden Park, Biggleswade',
      entry_link: '',
      contact_details: '',
      latitude: 52.0851,
      longitude: -0.3267,
      dirtyProperty: 'Should be cleaned',
    },
  ]

  // Mock page name.
  const mockPageName = 'athletics'

  test('When cleaner function is called, unused properties should be removed', () => {
    const cleanedComps = compititonUtility.cleaner(mockComps, mockPageName)
    expect(cleanedComps).not.toEqual(mockComps)
    expect(cleanedComps[0].dirtyProperty).toBeUndefined()
  })

  test('When using monthBuilder function, should return array of months', () => {
    const months = compititonUtility.monthBuilder(mockComps)
    expect(months.length).toBe(1) // Should only contain one month.
  })

  test('When using treeBuilder function, should return a tree of competitions', () => {
    const cleanedComps = compititonUtility.cleaner(mockComps, mockPageName)
    const months = compititonUtility.monthBuilder(cleanedComps)

    const compTree = compititonUtility.treeBuilder(cleanedComps, months)
    expect(compTree.length).toBe(1) // Should only contain one branch.
    expect(compTree[0].competitions.length).toBe(2) // Branch should contain 2 competitions.
  })
})
