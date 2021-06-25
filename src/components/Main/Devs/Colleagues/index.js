import { useQuery } from '@apollo/client'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FETCH_COLLEAGUES, FETCH_PENDING_INVITES_REQUEST, FETCH_PENDING_INVITES_RESPOND, FETCH_SUGGESTIONS } from '../../../../graphql/gql/dev/query'
import MyColleagues from './MyColleagues'
import Suggestions from './Suggestions'
import PendingRequest from './PendingRequest'
import PendingRespond from './PendingRespond'

const Colleagues = () => {

    const { myInfo } = useSelector(state => state.user)

    const dispatch = useDispatch()
    const { colleagues, suggestions, pendingRequest, pendingRespond} = useSelector(state => state.dev)

    const { data: colleaguesData } = useQuery(
        FETCH_COLLEAGUES,
        {
          onCompleted: () => {
            dispatch({ type: "FETCH_COLLEAGUES", payload: { colleagues: colleaguesData.colleagues } })
          }
        })

    const { loading: suggestionsLoading, data: suggestionsData } = useQuery(
        FETCH_SUGGESTIONS,
        {
            onCompleted: () => {
                dispatch({ type: "FETCH_SUGGESTIONS", payload: { suggestions: suggestionsData.suggestions } })
            }
        })

    const { loading: requestLoading, data: requestData } = useQuery(
        FETCH_PENDING_INVITES_REQUEST,
        {
            onCompleted: () => {
                dispatch({ type: "FETCH_PENDING_INVITES_REQUEST", payload: { pendingInvitesRequest: requestData.pendingInvitesRequest } })
            }
        })

    const { loading: respondLoading, data: respondData } = useQuery(
        FETCH_PENDING_INVITES_RESPOND,
        {
            onCompleted: () => {
                dispatch({ type: "FETCH_PENDING_INVITES_RESPOND", payload: { pendingInvitesRespond: respondData.pendingInvitesRespond } })
            }
        })

    return (
        <div>
            <div>
                <MyColleagues colleagues={colleagues} myInfo={myInfo} />
                <Suggestions suggestions={suggestions} />
            </div>
            <div>
                <PendingRespond  pendingRespond={pendingRespond} />
                <PendingRequest pendingRequest={pendingRequest} />
            </div>
        </div>
    )
}

export default Colleagues