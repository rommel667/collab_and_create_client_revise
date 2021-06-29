import { useQuery } from '@apollo/client'
import { useDispatch } from 'react-redux'
import { gql } from 'graphql-tag';

const MyInfoQuery = () => {

  const dispatch = useDispatch()

  const { data } = useQuery(
    MY_INFO,
    {
      onCompleted: () => {
        dispatch({ type: "MY_INFO", payload: { myInfo: data.myInfo } })
      }
    })

  return null
}

// export const MY_INFO = gql`
// query myInfo {
//     myInfo {
//         _id
//         name
//         email
//         photo
//         skills
//         portfolio
//         createdAt
//         updatedAt
//         colleagues {
//             _id
//           }
//         verifiedTeams {
//           _id
//         }
//         personalTaskColumns {
//           _id
//           columnName
//           sequence
//           tasks {
//             _id
//             description
//             createdAt
//             updatedAt
//           }
//         }
//         personalNoteCategories {
//           _id
//           categoryName
//           sequence
//           notes {
//             _id
//             description
//             createdAt
//             updatedAt
//           }
//         }
//     }
//   }
// `

export const MY_INFO = gql`
query myInfo {
    myInfo {
        _id
        name
        email
        photo
        skills
        portfolio
        createdAt
        updatedAt
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

export default MyInfoQuery