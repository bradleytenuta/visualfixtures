import compititonUtility from '~/services/compititonUtility.js'
import { mockCompeitions, mockedSport } from '~/test/mocks'

describe('compititonUtility', () => {
  test('When cleaner function is called, unused properties should be removed', () => {
    const cleanedComps = compititonUtility.cleaner(mockCompeitions, mockedSport)
    expect(cleanedComps).not.toEqual(mockCompeitions)
    expect(cleanedComps[0].dirtyProperty).toBeUndefined()
  })

  test('When using monthBuilder function, should return array of months', () => {
    const months = compititonUtility.monthBuilder(mockCompeitions)
    expect(months.length).toBe(1) // Should only contain one month.
  })

  test('When using treeBuilder function, should return a tree of competitions', () => {
    const cleanedComps = compititonUtility.cleaner(mockCompeitions, mockedSport)
    const months = compititonUtility.monthBuilder(cleanedComps)

    const compTree = compititonUtility.treeBuilder(cleanedComps, months)
    expect(compTree.length).toBe(1) // Should only contain one branch.
    expect(compTree[0].competitions.length).toBe(2) // Branch should contain 2 competitions.
  })
})
