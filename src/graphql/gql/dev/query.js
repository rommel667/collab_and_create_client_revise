import { gql } from 'graphql-tag';


export const FETCH_COLLEAGUES = gql`
query {
    colleagues {
        _id
        name
        email
        photo
    }
  }
`