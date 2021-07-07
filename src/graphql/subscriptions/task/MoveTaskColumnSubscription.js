import { useSubscription } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { gql } from 'graphql-tag'
import { PROJECTS_BY_USER } from "../../queries/project/ProjectsByUserQuery";

const MoveTaskColumnSubscription = ({ user }) => {

  const dispatch = useDispatch()
  const { projectId } = useSelector(state => state.form.newTaskColumn)

  const result = useSubscription(MOVE_TASK_COLUMN_SUBSCRIPTION,
    {
      variables: { userId: user?._id, projectId },
      onSubscriptionData: ({ client, subscriptionData }) => {
        const data = client.readQuery({
          query: PROJECTS_BY_USER,
        });
        
        if (data) {
            const targetProject = data.projectsByUser.find(project => project._id === subscriptionData.data.moveTaskColumn.projectId)
            const newTaskColumns = subscriptionData.data.moveTaskColumn.newSequenceIds.map((seq, index) => {
                const column = targetProject.taskColumns.find(column => column._id === seq)
                return { ...column, sequence: index + 1 }
            })
            const newData = data.projectsByUser.map(project => {
                if (project._id === subscriptionData.data.moveTaskColumn.projectId) {
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
            if (subscriptionData.data.moveTaskColumn.projectId === projectId) {
                dispatch({
                  type: "MOVE_TASK_COLUMN_SUBSCRIPTION", payload: { newSequenceIds: subscriptionData.data.moveTaskColumn.newSequenceIds }
                })
              }
        }        
      }
    });

  return null
}



export const MOVE_TASK_COLUMN_SUBSCRIPTION = gql`
  subscription moveTaskColumn($userId: ID!) {
    moveTaskColumn(userId: $userId) {
        newSequenceIds
        projectId
    }
  }
`;

export default MoveTaskColumnSubscription