import { gql } from 'graphql-tag'

export const PROJECTS_BY_USER = gql`
query projectsByUser {
    projectsByUser {
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