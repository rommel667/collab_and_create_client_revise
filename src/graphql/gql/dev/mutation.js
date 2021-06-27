import { gql } from 'graphql-tag'

export const SEND_INVITE = gql`
mutation sendInvite(
    $colleagueId: ID!
) {
  sendInvite(colleagueId: $colleagueId) {
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

export const CANCEL_REQUEST = gql`
mutation cancelRequest(
    $colleagueId: ID!
) {
  cancelRequest(colleagueId: $colleagueId) {
    _id
    name
    email
    photo
  }
}

`

export const ACCEPT_INVITE = gql`
mutation acceptInvite(
    $colleagueId: ID!
) {
  acceptInvite(colleagueId: $colleagueId) {
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

export const REJECT_INVITE = gql`
mutation rejectInvite(
    $colleagueId: ID!
) {
  rejectInvite(colleagueId: $colleagueId) {
    _id
    name
    email
    photo
  }
}

`