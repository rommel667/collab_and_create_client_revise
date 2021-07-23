import { useMutation } from '@apollo/client'
import React from 'react'
import { useDispatch } from 'react-redux'
import { ACCEPT_PROJECT_INVITE, REJECT_PROJECT_INVITE } from '../../../../../graphql/gql/notification/mutation'
import { PROJECTS_BY_USER } from '../../../../../graphql/queries/project/ProjectsByUserQuery'

const ItemButtons = ({ acceptedInvites, rejectedInvites, projectId }) => {

    const dispatch = useDispatch()

    const [acceptProjectInvite] = useMutation(ACCEPT_PROJECT_INVITE, {
        update(proxy, result) {
            const data = proxy.readQuery({
                query: PROJECTS_BY_USER
            })
            if (data) {
                const newData = [ ...data.projectsByUser, result.data.acceptProjectInvite ]
                proxy.writeQuery({
                    query: PROJECTS_BY_USER,
                    data: {
                        projectsByUser: [...newData]
                    }
                })
                dispatch({ type: "PROJECTS_BY_USER", payload: { projects: [...newData] } })
                dispatch({ type: "ACCEPT_PROJECT_INVITE", payload: { project: result.data.acceptProjectInvite } })
            }
            
        },
        variables: {
            projectId
        }
    })

    const [rejectProjectInvite] = useMutation(REJECT_PROJECT_INVITE, {
        update(proxy, result) {
            dispatch({ type: "REJECT_PROJECT_INVITE", payload: { project: result.data.rejectProjectInvite } })
        },
        variables: {
            projectId
        }
    })

    return (
        <>
        {(acceptedInvites.includes(projectId) || rejectedInvites.includes(projectId)) === false ?
            <div className="flex gap-1 mt-3">
                <button
                    onClick={acceptProjectInvite}
                    className="bg-indigo-600 hover:bg-indigo-700 rounded-md py-1 px-2"
                >
                    <p className="text-gray-100">Accept</p>
                </button>
                <button
                    onClick={rejectProjectInvite}
                    className="bg-indigo-600 hover:bg-indigo-700 rounded-md py-1 px-2"
                >
                    <p className="text-gray-100">Reject</p>
                </button>
                <button
                    onClick={() => console.log("NO")}
                    className="bg-indigo-600 hover:bg-indigo-700 rounded-md py-1 px-2"
                >
                    <p className="text-gray-100">Details</p>
                </button>
            </div> :
            null}
            </>
    )
}



export default ItemButtons