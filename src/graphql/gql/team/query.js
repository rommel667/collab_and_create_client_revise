import { gql } from 'graphql-tag';


export const FETCH_TEAMS_INITIAL = gql`
query {
    verifiedTeams {
        _id
        name
        email
        photo
    }
  }
`