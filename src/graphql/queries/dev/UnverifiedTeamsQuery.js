import { useQuery } from "@apollo/client"
import { useDispatch } from "react-redux"
import { gql } from 'graphql-tag';


const UnverifiedTeamsQuery = () => {
    const dispatch = useDispatch()

    const { data } = useQuery(
        UNVERIFIED_TEAMS,
        {
            onCompleted: () => {
                dispatch({ type: "UNVERIFIED_TEAMS", payload: { unverifiedTeams: data.unverifiedTeams } })
            }
        })
    return null
}

export const UNVERIFIED_TEAMS = gql`
    query unverifiedTeams {
        unverifiedTeams {
        _id
        teamName
        createdBy {
            _id
            name
            photo
        }
        members {
            _id
            name
            photo
        }
        }
    }
`

export default UnverifiedTeamsQuery