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


export const ACCEPT_TEAM_INVITE = gql`
mutation acceptTeamInvite(
    $teamId: ID!
) {
  acceptTeamInvite(teamId: $teamId) {
    teamId
    user {
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
  }
}

`

export const REJECT_TEAM_INVITE = gql`
mutation rejectTeamInvite(
    $teamId: ID!
) {
  rejectTeamInvite(teamId: $teamId) {
    teamId
    user {
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
  }
}

`