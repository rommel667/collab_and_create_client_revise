import { gql } from 'graphql-tag';


export const FETCH_MY_INFO = gql`
query {
    myInfo {
        _id
        colleagues {
            _id
          }
        verifiedTeams {
          _id
        }
        personalTaskColumns {
          _id
          columnName
          sequence
          tasks {
            _id
            description
            createdAt
            updatedAt
          }
        }
        personalNoteCategories {
          _id
          categoryName
          sequence
          notes {
            _id
            description
            createdAt
            updatedAt
          }
        }
    }
  }
`