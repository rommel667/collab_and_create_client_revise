import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import MyColleagues from './MyColleagues'
import Suggestions from './Suggestions'
import PendingRequest from './PendingRequest'
import PendingRespond from './PendingRespond'
import ColleaguesQuery from '../../../../graphql/queries/dev/ColleaguesQuery'
import SuggestionsQuery from '../../../../graphql/queries/dev/SuggestionsQuery'
import PendingInvitesRequestQuery from '../../../../graphql/queries/dev/PendingInvitesRequestQuery'
import PendingInvitesRespondQuery from '../../../../graphql/queries/dev/PendingInvitesRespondQuery'

const Colleagues = () => {

    const { myInfo } = useSelector(state => state.user)

    const [show, setShow] = useState("colleagues")

    const { colleagues, suggestions, pendingInvitesRequest, pendingInvitesRespond } = useSelector(state => state.dev)


    return (
        <div>
            <>
                <ColleaguesQuery />
                <SuggestionsQuery />
                <PendingInvitesRequestQuery />
                <PendingInvitesRespondQuery />
            </>
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
                    <PendingRespond pendingRespond={pendingInvitesRespond} myInfo={myInfo} />
                    <PendingRequest pendingRequest={pendingInvitesRequest} myInfo={myInfo} />
                </div>}
        </div>
    )
}

export default Colleagues