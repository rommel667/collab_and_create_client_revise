import { gql } from 'graphql-tag'

export const FETCH_PROJECT_INVITES = gql`
query {
    unconfirmProjectInvites {
        _id
        projectName
        description
        techStacks
        createdBy {
          _id
          email
          name
          photo
        }
        createdAt
        updatedAt
    }
  }
`