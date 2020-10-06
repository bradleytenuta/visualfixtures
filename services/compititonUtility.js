import moment from 'moment'

export default {
  /**
   * Takes a list of competitions and breaks them down into a tree based on
   * the available months.
   */
  treeBuilder(competitions, months) {
    // Creates month containers and supplies is objects that contain each
    // available month.
    var compBranches = []
    months.forEach((month) => {
      compBranches.push({
        month: month,
        competitions: [],
      })
    })

    // Loops through each competition
    competitions.forEach((competition) => {
      // Do not add the competition if it is a demo fixture and not an actual fixture.
      if (competition.is_demo) return

      // Loops through each month
      months.forEach((month) => {
        // If the competition month is the same as the current filtered month
        // then add it to its branch.
        if (moment(competition.date).isSame(moment(month, 'MMMM YYYY'), 'month')) {
          // Finds the branch that matches and adds the competition to its list.
          var branch = compBranches.find((branch) => branch.month == month)
          branch.competitions.push(competition)
        }
      })
    })

    // Code section below removes all the branches without any competitions from
    // the list of compbranches. Its complicated to remove specific elements from
    // an array in javascript.
    var tempCompBranches = [...compBranches]
    var branchesToRemove = []
    // Loops through the temp array and finds all indexs to remove.
    var i
    for (i = 0; i < tempCompBranches.length; i++) {
      if (tempCompBranches[i].competitions.length == 0) {
        branchesToRemove.push(i)
      }
    }
    // Loops through temp array in reverse order and removes empty elements.
    for (var i = branchesToRemove.length - 1; i >= 0; i--) {
      tempCompBranches.splice(branchesToRemove[i], 1)
    }

    return tempCompBranches
  },

  /**
   * This function cleans the list of competitions so the compeititon objects
   * follow a layout that matches the layout used within the fixture page.
   * This also removes any unused properties from the competition objects to improve
   * performance.
   * The page name is used to allow different sports that may have different layouts
   * be cleaned into a format that fixture pages can read.
   */
  cleaner(competitions, sport) {
    var cleanCompetitions = []
    if (sport.toLowerCase() == 'athletics') {
      competitions.forEach((competition) => {
        var cleanComp = {
          id: competition.id,
          is_demo: competition.is_demo,
          date: competition.date,
          full_name: competition.full_name,
          num_competitors: competition.num_competitors,
          finish_date: competition.finish_date,
          type: competition.type,
          age_groups: competition.age_groups,
          address: competition.address,
          entry_link: competition.entry_link,
          contact_details: competition.contact_details,
          latitude: competition.latitude,
          longitude: competition.longitude,
        }
        cleanCompetitions.push(cleanComp)
      })
    }
    return cleanCompetitions
  },

  /**
   * Creates a list of months based on competition dates.
   */
  monthBuilder(competitions) {
    var months = []
    // Adds all the available months and countries from list.
    competitions.forEach((competition) => {
      // Adds available months.
      var month = moment(competition.date).format('MMMM YYYY')
      if (!months.includes(month)) {
        months.push(month)
      }
    })

    // Sorts the months in calendar order.
    return months.sort((x, y) => moment(x, 'MMMM YYYY') - moment(y, 'MMMM YYYY'))
  },
}
