import { useSubscription } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { gql } from 'graphql-tag'
import { PROJECTS_BY_USER } from "../../queries/project/ProjectsByUserQuery";

const NewTaskSubscription = ({ user }) => {

  const dispatch = useDispatch()
  const { projectId } = useSelector(state => state.form.newTaskColumn)

  const result = useSubscription(NEW_TASK_SUBSCRIPTION,
    {
      variables: { userId: user?._id, projectId },
      onSubscriptionData: ({ client, subscriptionData }) => {
        const data = client.readQuery({
          query: PROJECTS_BY_USER,

        });
        if (data) {
            const newData = data.projectsByUser.map(project => {
                if (project._id === subscriptionData.data.newTask.projectId) {
                    return {
                        ...project, taskColumns: project.taskColumns.map(column => {
                            if (column._id === subscriptionData.data.newTask.columnId) {
                                return { ...column, tasks: [subscriptionData.data.newTask, ...column.tasks] }
                            } else {
                                return { ...column }
                            }
                        })
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
          });
          dispatch({ type: "PROJECTS_BY_USER", payload: { projects: [ ...newData ] } })
          if (subscriptionData.data.newTask.projectId === projectId) {
            dispatch({
              type: "NEW_TASK_SUBSCRIPTION", payload: { newTask: subscriptionData.data.newTask }
            })
          }

        }
      }
    });

  return null
}



export const NEW_TASK_SUBSCRIPTION = gql`
  subscription newTask($userId: ID!) {
    newTask(userId: $userId) {
        _id
        description
        columnId
        projectId
        createdBy {
          _id
          name
          email
          photo
        }
        inCharge {
          _id
          name
          email
          photo
        }
        createdAt
        updatedAt
    }
  }
`;

export default NewTaskSubscription