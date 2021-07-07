import { useSubscription } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { gql } from 'graphql-tag'
import { PROJECTS_BY_USER } from "../../queries/project/ProjectsByUserQuery";

const DeleteTaskColumnSubscription = ({ user }) => {

    const dispatch = useDispatch()
    const { projectId } = useSelector(state => state.form.newTaskColumn)

    const result = useSubscription(DELETE_TASK_COLUMN_SUBSCRIPTION,
        {
            variables: { userId: user?._id, projectId },
            onSubscriptionData: ({ client, subscriptionData }) => {
                const data = client.readQuery({
                    query: PROJECTS_BY_USER,

                });

                if (data) {
                    const newData = data.projectsByUser.map(project => {
                        if (project._id === subscriptionData.data.deleteTaskColumn.projectId) {
                            return { ...project, taskColumns: [...project.taskColumns.filter(col => col._id !== subscriptionData.data.deleteTaskColumn._id)] }
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
                    if (subscriptionData.data.deleteTaskColumn.projectId === projectId) {
                        dispatch({ type: "DELETE_TASK_COLUMN_SUBSCRIPTION", payload: { columnId: subscriptionData.data.deleteTaskColumn._id } })
                    }
                }
            }
        });

    return null
}



export const DELETE_TASK_COLUMN_SUBSCRIPTION = gql`
  subscription deleteTaskColumn($userId: ID!) {
    deleteTaskColumn(userId: $userId) {
        _id
        projectId
    }
  }
`;

export default DeleteTaskColumnSubscription

