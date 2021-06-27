import { useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FETCH_COLLEAGUES, FETCH_PENDING_INVITES_REQUEST, FETCH_PENDING_INVITES_RESPOND, FETCH_SUGGESTIONS } from '../../../../graphql/gql/dev/query'
import MyColleagues from './MyColleagues'
import Suggestions from './Suggestions'
import PendingRequest from './PendingRequest'
import PendingRespond from './PendingRespond'

const Colleagues = () => {

    const { myInfo } = useSelector(state => state.user)

    const [ show, setShow ] = useState("colleagues")

    const dispatch = useDispatch()
    const { colleagues, suggestions, pendingRequest, pendingRespond } = useSelector(state => state.dev)

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
            <div className="flex gap-3 mb-4">
                <p className={`${show === "colleagues" ? "text-indigo-600" : ""} cursor-pointer`} onClick={() => setShow("colleagues")}>Colleagues</p>
                <p className={`${show === "invites" ? "text-indigo-600" : ""} cursor-pointer`} onClick={() => setShow("invites")}>Invites</p>
            </div>
            {show === "colleagues" &&
            <div className="flex gap-2">
                <MyColleagues colleagues={colleagues} myInfo={myInfo} />
                <Suggestions suggestions={suggestions} myInfo={myInfo} />
            </div>}
            {show === "invites" &&
            <div className="flex gap-2">
                <PendingRespond pendingRespond={pendingRespond} myInfo={myInfo} />
                <PendingRequest pendingRequest={pendingRequest} myInfo={myInfo} />
            </div>}
        </div>
    )
}

export default Colleagues