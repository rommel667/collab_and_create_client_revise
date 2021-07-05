import { gql } from 'graphql-tag'


export const NEW_PROJECT = gql`
mutation newProject(
    $projectName: String!
    $description: String!
    $unconfirmMembers: [ID]!
    $techStacks: [String]!
) {
    newProject(
        projectInput: {
            projectName: $projectName
            description: $description
            unconfirmMembers: $unconfirmMembers
            techStacks: $techStacks
        }) {
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