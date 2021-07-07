import SendInviteSubscription from "./SendInviteSubscription"
import AcceptInviteSubscription from "./AcceptInviteSubscription"
import RejectInviteSubscription from "./RejectInviteSubscription"
import CancelRequestSubscription from "./CancelRequestSubscription"
import NewTeamSubscription from "./NewTeamSubscription"
import AcceptTeamInviteSubscription from "./AcceptTeamInviteSubscription"
import RejectTeamInviteSubscription from "./RejectTeamInviteSubscription"

const DevSubscription = ({ user }) => {
    return (
        <>
            <SendInviteSubscription user={user} />
            <AcceptInviteSubscription user={user} />
            <RejectInviteSubscription user={user} />
            <CancelRequestSubscription user={user} />
            <NewTeamSubscription user={user} />
            <AcceptTeamInviteSubscription user={user} />
            <RejectTeamInviteSubscription user={user} />
        </>
    )
}

export default DevSubscription
