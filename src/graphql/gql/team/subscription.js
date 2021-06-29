import { gql } from 'graphql-tag'

export const NEW_TEAM_SUBSCRIPTION = gql`
  subscription newTeam($userId: ID!) {
    newTeam(userId: $userId) {
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
        }
    }
  }
`;