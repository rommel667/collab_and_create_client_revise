import NewProjectInviteSubscription from "./NewProjectInviteSubscription"
import AcceptProjectInviteSubscription from "./AcceptProjectInviteSubscription"

const ProjectSubscription = ({ user }) => {
    return (
        <>
            <NewProjectInviteSubscription user={user} />
            <AcceptProjectInviteSubscription user={user} />
        </>
    )
}

export default ProjectSubscription
