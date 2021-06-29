import { useQuery } from "@apollo/client"
import { useDispatch } from "react-redux"
import { gql } from 'graphql-tag';


const SuggestionsQuery = () => {
    const dispatch = useDispatch()

    const { data } = useQuery(
        SUGGESTIONS,
        {
            onCompleted: () => {
                dispatch({ type: "SUGGESTIONS", payload: { suggestions: data.suggestions } })
            }
        })
    return null
}

export const SUGGESTIONS = gql`
query suggestions {
  suggestions {
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

export default SuggestionsQuery