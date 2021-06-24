import { useQuery } from '@apollo/client'
import { useDispatch } from 'react-redux'
import { FETCH_MY_INFO } from '../../gql/user/query'

const MyInfoQuery = () => {

    const dispatch = useDispatch()

    const { loading, data } = useQuery(
        FETCH_MY_INFO,
        {
            onCompleted: () => {
                dispatch({ type: "FETCH_MY_INFO", payload: { myInfo: data.myInfo } })
            }
        })
   
    return null
}

export default MyInfoQuery