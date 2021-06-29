import { useQuery } from "@apollo/client"
import { useDispatch } from "react-redux"
import { gql } from 'graphql-tag';


const PendingInvitesRequestQuery = () => {
    const dispatch = useDispatch()

    const { data } = useQuery(
        PENDING_INVITES_REQUEST,
        {
            onCompleted: () => {
                dispatch({ type: "PENDING_INVITES_REQUEST", payload: { pendingInvitesRequest: data.pendingInvitesRequest } })
            }
        })
    return null
}

export const PENDING_INVITES_REQUEST = gql`
query pendingInvitesRequest {
  pendingInvitesRequest {
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

export default PendingInvitesRequestQuery