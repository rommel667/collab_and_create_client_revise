import { useSubscription } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { gql } from 'graphql-tag'
import { PROJECTS_BY_USER } from "../../queries/project/ProjectsByUserQuery";

const NewTaskColumnSubscription = ({ user }) => {

  const dispatch = useDispatch()
  const { projectId } = useSelector(state => state.form.newTaskColumn)

  const result = useSubscription(NEW_TASK_COLUMN_SUBSCRIPTION,
    {
      variables: { userId: user?._id, projectId },
      onSubscriptionData: ({ client, subscriptionData }) => {
        const data = client.readQuery({
          query: PROJECTS_BY_USER,

        });

        if (data) {
          const newData = data.projectsByUser.map(project => {
            if (project._id === subscriptionData.data.newTaskColumn.projectId) {
              return { ...project, taskColumns: [...project.taskColumns, subscriptionData.data.newTaskColumn] }
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
          dispatch({ type: "PROJECTS_BY_USER", payload: { projects: [...newData] } })
          if (subscriptionData.data.newTaskColumn.projectId === projectId) {
            dispatch({
              type: "NEW_TASK_COLUMN_SUBSCRIPTION", payload: { newTaskColumn: subscriptionData.data.newTaskColumn }
            })
          }

        }
      }
    });

  return null
}



export const NEW_TASK_COLUMN_SUBSCRIPTION = gql`
  subscription newTaskColumn($userId: ID!) {
    newTaskColumn(userId: $userId) {
        _id
      columnName
      sequence
      projectId
      createdBy {
        _id
        name
        email
        photo
      }
      tasks {
        _id
      }
      createdAt
    updatedAt
    }
  }
`;

export default NewTaskColumnSubscription