import { gql } from 'graphql-tag'

export const ACCEPT_PROJECT_INVITE = gql`
mutation acceptProjectInvite(
    $projectId: ID!
) {
    acceptProjectInvite(projectId: $projectId ) {
      _id
      projectName
      description
      status
      techStacks
      createdBy {
        _id
        name
        email
        photo
      }
      confirmedMembers {
        _id
        name
        email
        photo
      }
      createdAt
      updatedAt
      taskColumns {
        _id
        sequence
        tasks {
          _id
          createdBy {
            _id
          }
          inCharge {
            _id
          }
        }
      }
      noteCategories {
        _id
        notes {
          _id
          createdBy {
            _id
          }
        }
      }
    }
}

`

export const REJECT_PROJECT_INVITE = gql`
mutation rejectProjectInvite(
    $projectId: ID!
) {
    rejectProjectInvite(projectId: $projectId ) {
          _id
          projectName
    }
}

`