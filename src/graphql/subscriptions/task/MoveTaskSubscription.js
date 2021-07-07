import { useSubscription } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { gql } from 'graphql-tag'
import { PROJECTS_BY_USER } from "../../queries/project/ProjectsByUserQuery";

const MoveTaskSubscription = ({ user }) => {

  const dispatch = useDispatch()
  const { projectId } = useSelector(state => state.form.newTaskColumn)

  const result = useSubscription(MOVE_TASK_SUBSCRIPTION,
    {
      variables: { userId: user?._id, projectId },
      onSubscriptionData: ({ client, subscriptionData }) => {
        const { sourceColumnId, destinationColumnId, taskId } = subscriptionData.data.moveTask
        const data = client.readQuery({
            query: PROJECTS_BY_USER
        })

        if(data) {
            const targetProject = data.projectsByUser.find(project => project._id === subscriptionData.data.moveTask.projectId)
            const targetTask = targetProject.taskColumns.find(col => col._id === sourceColumnId).tasks.find(task => task._id === taskId)
            const newTaskColumns = targetProject.taskColumns.map(column => {
                if(column._id === sourceColumnId) {
                    return { ...column, tasks: [ ...column.tasks.filter(task => task._id !== taskId) ] }
                }
                else if(column._id === destinationColumnId) {
                    return { ...column, tasks: [ targetTask, ...column.tasks ] }
                }
                else {
                    return { ...column }
                }
            })
            console.log("NEW", newTaskColumns);
            const newData = data.projectsByUser.map(project => {
                if (project._id === subscriptionData.data.moveTask.projectId) {
                    return { ...project, taskColumns: [ ...newTaskColumns ]}
                } else {
                    return { ...project }
                }
            })
            client.writeQuery({
                query: PROJECTS_BY_USER,
                data: {
                    projectsByUser: [...newData ]
                }
            })
            dispatch({ type: "PROJECTS_BY_USER", payload: { projects: [ ...newData ] } })
            if (subscriptionData.data.moveTask.projectId === projectId) {
                dispatch({
                  type: "MOVE_TASK_SUBSCRIPTION", payload: { sourceColumnId, destinationColumnId, taskId }
                })
              }
        }      
      }
    });

  return null
}



export const MOVE_TASK_SUBSCRIPTION = gql`
  subscription moveTask($userId: ID!) {
    moveTask(userId: $userId) {
        message
        sourceColumnId
        destinationColumnId
        taskId
        projectId
    }
  }
`;

export default MoveTaskSubscription