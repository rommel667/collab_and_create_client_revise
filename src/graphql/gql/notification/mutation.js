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
          photo
        }
        confirmedMembers {
            _id
            name
            email
            photo
        }
        unconfirmMembers {
          _id
          name
          photo
        }
        taskColumns {
            _id
            columnName
            sequence
            createdBy {
              _id
              name
              email
              photo
            }
            tasks {
              _id
              description
              createdBy {
                _id
                name
                email
                photo
              }
              inCharge {
                _id
                name
                email
                photo
              }
              createdAt
              updatedAt
            }
          }
          noteCategories {
            _id
            categoryName
            sequence
            createdBy {
              _id
              name
              email
              photo
            }
            notes {
              _id
              description
              createdBy {
                _id
                name
                email
                photo
              }
              createdAt
              updatedAt
            }
          }
        createdAt
        updatedAt
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