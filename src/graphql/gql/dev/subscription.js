import { gql } from 'graphql-tag'

export const SEND_INVITE_SUBSCRIPTION = gql`
  subscription sendInvite($userId: ID!) {
    sendInvite(userId: $userId) {
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
`;

export const CANCEL_REQUEST_SUBSCRIPTION = gql`
  subscription cancelRequest($userId: ID!) {
    cancelRequest(userId: $userId) {
      _id
    }
  }
`;

export const ACCEPT_INVITE_SUBSCRIPTION = gql`
  subscription acceptInvite($userId: ID!) {
    acceptInvite(userId: $userId) {
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
`;

export const REJECT_INVITE_SUBSCRIPTION = gql`
  subscription rejectInvite($userId: ID!) {
    rejectInvite(userId: $userId) {
      _id
      name
      email
      photo
    }
  }
`;