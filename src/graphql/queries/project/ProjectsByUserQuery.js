import { useQuery } from '@apollo/client'
import { useDispatch } from 'react-redux'
import { gql } from 'graphql-tag';

const ProjectsByUserQuery = () => {

  const dispatch = useDispatch()

  const { data } = useQuery(
    PROJECTS_BY_USER,
    {
      onCompleted: () => {
        dispatch({ type: "PROJECTS_BY_USER", payload: { projects: data.projectsByUser } })
      }
    })
  return null
}

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

export default ProjectsByUserQuery