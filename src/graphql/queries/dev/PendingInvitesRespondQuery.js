import { useQuery } from "@apollo/client"
import { useDispatch } from "react-redux"
import { gql } from 'graphql-tag';


const PendingInvitesRespondQuery = () => {
    const dispatch = useDispatch()

    const { data } = useQuery(
        PENDING_INVITES_RESPOND,
        {
            onCompleted: () => {
                dispatch({ type: "PENDING_INVITES_RESPOND", payload: { pendingInvitesRespond: data.pendingInvitesRespond } })
            }
        })
    return null
}

export const PENDING_INVITES_RESPOND = gql`
query pendingInvitesRespond {
  pendingInvitesRespond {
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

export default PendingInvitesRespondQuery