import { gql } from 'graphql-tag';


export const FETCH_COLLEAGUES = gql`
query {
    colleagues {
        _id
        name
        email
        photo
        colleagues {
          _id
          photo
        }
    }
  }
`

export const FETCH_SUGGESTIONS = gql`
query {
  suggestions {
        _id
        name
        email
        photo
    }
  }
`

export const FETCH_PENDING_INVITES_REQUEST = gql`
query {
  pendingInvitesRequest {
        _id
        name
        email
        photo
    }
  }
`

export const FETCH_PENDING_INVITES_RESPOND = gql`
query {
  pendingInvitesRespond {
        _id
        name
        email
        photo
    }
  }
`