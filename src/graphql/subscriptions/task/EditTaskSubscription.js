import { useSubscription } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { gql } from 'graphql-tag'
import { PROJECTS_BY_USER } from "../../queries/project/ProjectsByUserQuery";

const EditTaskSubscription = ({ user }) => {

  const dispatch = useDispatch()
  const { projectId } = useSelector(state => state.form.newTaskColumn)

  const result = useSubscription(EDIT_TASK_SUBSCRIPTION,
    {
      variables: { userId: user?._id, projectId },
      onSubscriptionData: ({ client, subscriptionData }) => {
        const { _id, description, inCharge, columnId } = subscriptionData.data.editTask
        const data = client.readQuery({
          query: PROJECTS_BY_USER,

        });

        if (data) {
            const newData = data.projectsByUser.map(project => {
                if (project._id === subscriptionData.data.editTask.projectId) {
                    return {
                        ...project, taskColumns: [...project.taskColumns.map(column => {
                            if (column._id === columnId) {
                                return { ...column, tasks: [ ...column.tasks.map(task => {
                                    if(task._id === _id) {
                                        return { ...task, description, inCharge }
                                    } else {
                                        return { ...task }
                                    }
                                }) ] }
                            } else {
                                return { ...column }
                            }
                        })]
                    }
                } else {
                    return { ...project }
                }
            })
            client.writeQuery({
                query: PROJECTS_BY_USER,
                data: {
                    projectsByUser: [...newData]
                }
            })
            dispatch({ type: "PROJECTS_BY_USER", payload: { projects: [...newData] } })
            if (subscriptionData.data.editTask.projectId === projectId) {
                dispatch({ type: "EDIT_TASK_SUBSCRIPTION", payload: { taskId: _id, columnId, description, inCharge } })
              }
        }

        
      }
    });

  return null
}



export const EDIT_TASK_SUBSCRIPTION = gql`
  subscription editTask($userId: ID!) {
    editTask(userId: $userId) {
        _id
        description
        projectId
        columnId
        inCharge {
            _id
            name
            email
            photo
        }
    }
  }
`;

export default EditTaskSubscription