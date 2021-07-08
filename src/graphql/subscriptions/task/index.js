import NewTaskColumnSubscription from "./NewTaskColumnSubscription"
import NewTaskSubscription from "./NewTaskSubscription"
import MoveTaskColumnSubscription from "./MoveTaskColumnSubscription"
import MoveTaskSubscription from "./MoveTaskSubscription"
import EditTaskColumnSubscription from "./EditTaskColumnSubscription"
import DeleteTaskColumnSubscription from "./DeleteColumnSubscription"
import EditTaskSubscription from "./EditTaskSubscription"
import DeleteTaskSubscription from "./DeleteTaskSubscription"

const TaskSubscription = ({ user }) => {
    return (
        <>
            <NewTaskColumnSubscription user={user} />
            <NewTaskSubscription user={user} />
            <MoveTaskColumnSubscription user={user} />
            <MoveTaskSubscription user={user} />
            <EditTaskColumnSubscription user={user} />
            <DeleteTaskColumnSubscription user={user} />
            <EditTaskSubscription user={user} />
            <DeleteTaskSubscription user={user} />
        </>
    )
}

export default TaskSubscription
