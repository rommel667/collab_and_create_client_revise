import { gql } from 'graphql-tag'

export const NEW_TEAM = gql`
mutation newTeam(
    $teamName: String!
    $members: [ID]!
) {
  newTeam(teamName: $teamName, members: $members) {
    _id
    teamName
    createdBy {
    _id
    name
    photo
    }
    members {
    _id
    name
    photo
    verifiedTeams {
        _id
    }
    unverifiedTeams {
        _id
    }
    }
    projects {
    _id
    projectName
    }
    
  }
}

`