import { useSubscription } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { gql } from 'graphql-tag'
import { PROJECTS_BY_USER } from "../../queries/project/ProjectsByUserQuery";

const DeleteTaskSubscription = ({ user }) => {

  const dispatch = useDispatch()
  const { projectId } = useSelector(state => state.form.newTaskColumn)

  const result = useSubscription(DELETE_TASK_SUBSCRIPTION,
    {
      variables: { userId: user?._id, projectId },
      onSubscriptionData: ({ client, subscriptionData }) => {
        const { _id, columnId } = subscriptionData.data.deleteTask
        const data = client.readQuery({
          query: PROJECTS_BY_USER,

        });

        if (data) {
            const newData = data.projectsByUser.map(project => {
                if (project._id === subscriptionData.data.deleteTask.projectId) {
                    return {
                        ...project, taskColumns: [...project.taskColumns.map(column => {
                            if (column._id === columnId) {
                                return { ...column, tasks: [ ...column.tasks.filter(task => task._id !== _id) ] }
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
            if (subscriptionData.data.deleteTask.projectId === projectId) {
                dispatch({ type: "DELETE_TASK_SUBSCRIPTION", payload: { taskId: _id, columnId } })
              }
        }

        
      }
    });

  return null
}



export const DELETE_TASK_SUBSCRIPTION = gql`
  subscription deleteTask($userId: ID!) {
    deleteTask(userId: $userId) {
        _id
        columnId
        projectId
    }
  }
`;

export default DeleteTaskSubscription