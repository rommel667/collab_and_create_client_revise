import { useQuery } from '@apollo/client'
import { useDispatch } from 'react-redux'
import { FETCH_COLLEAGUES } from '../../gql/dev/query'

const ColleaguesInitialQuery = () => {

    const dispatch = useDispatch()

    const { data: colleaguesData } = useQuery(
        FETCH_COLLEAGUES,
        {
          onCompleted: () => {
            dispatch({ type: "FETCH_COLLEAGUES", payload: { colleagues: colleaguesData.colleagues } })
          }
        })
    return null
}

export default ColleaguesInitialQuery