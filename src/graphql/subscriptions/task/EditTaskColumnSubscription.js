import { useSubscription } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { gql } from 'graphql-tag'
import { PROJECTS_BY_USER } from "../../queries/project/ProjectsByUserQuery";

const EditTaskColumnSubscription = ({ user }) => {

  const dispatch = useDispatch()
  const { projectId } = useSelector(state => state.form.newTaskColumn)

  const result = useSubscription(EDIT_TASK_COLUMN_SUBSCRIPTION,
    {
      variables: { userId: user?._id, projectId },
      onSubscriptionData: ({ client, subscriptionData }) => {
        const data = client.readQuery({
          query: PROJECTS_BY_USER,

        });

        if (data) {
            const newData = data.projectsByUser.map(project => {
                if (project._id === subscriptionData.data.editTaskColumn.projectId) {
                    return { ...project, taskColumns: [ ...project.taskColumns.map(column => {
                        if(column._id === subscriptionData.data.editTaskColumn._id) {
                            return { ...column, columnName: subscriptionData.data.editTaskColumn.columnName }
                        } else {
                            return { ...column }
                        }
                    }) ] }
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
          if (subscriptionData.data.editTaskColumn.projectId === projectId) {
            dispatch({ type: "EDIT_TASK_COLUMN_SUBSCRIPTION", payload: { columnId: subscriptionData.data.editTaskColumn._id, columnName: subscriptionData.data.editTaskColumn.columnName } })
          }
        }
      }
    });

  return null
}



export const EDIT_TASK_COLUMN_SUBSCRIPTION = gql`
  subscription editTaskColumn($userId: ID!) {
    editTaskColumn(userId: $userId) {
        _id
        columnName
        projectId
    }
  }
`;

export default EditTaskColumnSubscription
