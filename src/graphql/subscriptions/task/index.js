import NewTaskColumnSubscription from "./NewTaskColumnSubscription"
import NewTaskSubscription from "./NewTaskSubscription"
import MoveTaskColumnSubscription from "./MoveTaskColumnSubscription"
import MoveTaskSubscription from "./MoveTaskSubscription"
import EditTaskColumnSubscription from "./EditTaskColumnSubscription"

const TaskSubscription = ({ user }) => {
    return (
        <>
            <NewTaskColumnSubscription user={user} />
            <NewTaskSubscription user={user} />
            <MoveTaskColumnSubscription user={user} />
            <MoveTaskSubscription user={user} />
            <EditTaskColumnSubscription user={user} />
        </>
    )
}

export default TaskSubscription
