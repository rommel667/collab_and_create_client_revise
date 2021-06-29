import { useQuery } from "@apollo/client"
import { useDispatch } from "react-redux"
import { gql } from 'graphql-tag';


const ColleaguesQuery = () => {
    const dispatch = useDispatch()

    const { data } = useQuery(
        COLLEAGUES,
        {
            onCompleted: () => {
                dispatch({ type: "COLLEAGUES", payload: { colleagues: data.colleagues } })
            }
        })
    return null
}

export const COLLEAGUES = gql`
query colleagues {
    colleagues {
        _id
        name
        email
        photo
        colleagues {
          _id
          photo
        }
    }
  }
`

export default ColleaguesQuery