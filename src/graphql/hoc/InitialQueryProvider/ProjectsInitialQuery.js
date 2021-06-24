import { useQuery } from '@apollo/client'
import { useDispatch } from 'react-redux'
import { PROJECTS_BY_USER } from '../../gql/project/query'

const ProjectsInitialQuery = () => {

    const dispatch = useDispatch()

    const { loading, data } = useQuery(
        PROJECTS_BY_USER,
        {
            onCompleted: () => {
                dispatch({ type: "FETCH_PROJECTS", payload: { projects: data.projectsByUser } })
            }
        })
   
    return null
}

export default ProjectsInitialQuery