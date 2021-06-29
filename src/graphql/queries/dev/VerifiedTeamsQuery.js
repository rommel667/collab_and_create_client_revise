import { useQuery } from "@apollo/client"
import { useDispatch } from "react-redux"
import { gql } from 'graphql-tag';


const VerifiedTeamsQuery = () => {
    const dispatch = useDispatch()

    const { data } = useQuery(
        VERIFIED_TEAMS,
        {
            onCompleted: () => {
                dispatch({ type: "VERIFIED_TEAMS", payload: { verifiedTeams: data.verifiedTeams } })
            }
        })
    return null
}

export const VERIFIED_TEAMS = gql`
    query verifiedTeams {
        verifiedTeams {
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
            verifiedTeams {
            _id
            }
            unverifiedTeams {
            _id
            }
        }
        projects {
            _id
            projectName
        }
        }
    }
`

export default VerifiedTeamsQuery