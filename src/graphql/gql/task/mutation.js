import { gql } from 'graphql-tag'

export const NEW_TASK_COLUMN = gql`
mutation newTaskColumn(
    $columnName: String!
    $projectId: ID!
) {
    newTaskColumn( columnName: $columnName, projectId: $projectId ) {
      _id
      columnName
      sequence
      projectId
      createdBy {
        _id
        name
        email
        photo
      }
      tasks {
        _id
        description
        columnId
        createdBy {
          _id
          name
          email
          photo
        }
        inCharge {
          _id
          name
          email
          photo
        }
        createdAt
        updatedAt
      }
      createdAt
    	updatedAt
    }
}

`

export const NEW_TASK = gql`
mutation newTask(
    $description: String!
    $inCharge: [ID]
    $columnId: ID!
    $projectId: ID!
) {
    newTask( description: $description, inCharge: $inCharge, columnId: $columnId, projectId: $projectId ) {
        _id
        description
        columnId
        projectId
        createdBy {
          _id
          name
          email
          photo
        }
        inCharge {
          _id
          name
          email
          photo
        }
        createdAt
        updatedAt
    }
}

`

export const MOVE_TASK_COLUMN = gql`
mutation moveTaskColumn(
    $taskColumnIds: [ID]!
    $projectId: ID!
) {
    moveTaskColumn(taskColumnIds: $taskColumnIds, projectId: $projectId) {
      newSequenceIds
      projectId
    }
}

`

export const MOVE_TASK = gql`
mutation moveTask(
    $sourceColumnId: ID!
    $destinationColumnId: ID!
    $taskId: ID!
    $projectId: ID!
) {
    moveTask( sourceColumnId: $sourceColumnId, destinationColumnId: $destinationColumnId, taskId: $taskId, projectId: $projectId ) {
      message
      sourceColumnId
      destinationColumnId
      taskId
      projectId
      }
}

`

export const EDIT_TASK_COLUMN = gql`
mutation editTaskColumn(
    $columnId: ID!
    $columnName: String!
    $projectId: ID!
) {
    editTaskColumn( columnId: $columnId, columnName: $columnName, projectId: $projectId ) {
      _id
      columnName
      projectId
    }
}

`

export const DELETE_TASK_COLUMN = gql`
mutation deleteTaskColumn(
    $columnId: ID!
    $projectId: ID!
) {
    deleteTaskColumn( columnId: $columnId, projectId: $projectId ) {
      _id
      projectId
    }
}

`

export const EDIT_TASK = gql`
mutation editTask(
    $taskId: ID!
    $description: String!
    $inCharge: [ID]!
    $projectId: ID!
) {
    editTask( taskId: $taskId, description: $description, inCharge: $inCharge, projectId: $projectId ) {
      _id
      description
      projectId
      columnId
      inCharge {
        _id
        name
        email
        photo
        }
    }
}

`

export const DELETE_TASK = gql`
mutation deleteTask(
    $taskId: ID!
    $columnId: ID!
    $projectId: ID!
) {
    deleteTask( taskId: $taskId, columnId: $columnId, projectId: $projectId ) {
      _id
      columnId
      projectId
    }
}

`

export const NEW_TASK_COLUMN_PERSONAL = gql`
mutation newTaskColumnPersonal(
    $columnName: String!
) {
    newTaskColumnPersonal( columnName: $columnName ) {
      _id
      columnName
      sequence
      tasks {
        _id
        description
        createdAt
        updatedAt
      }
    }
}

`

export const NEW_TASK_PERSONAL = gql`
mutation newTaskPersonal(
    $description: String!
    $columnId: ID!
) {
    newTaskPersonal( description: $description, columnId: $columnId ) {
        _id
        description
        columnId
        createdAt
        updatedAt
    }
}

`