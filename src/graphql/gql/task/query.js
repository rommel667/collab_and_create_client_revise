import { gql } from 'graphql-tag';


export const TASK_COLUMNS_BY_PROJECT = gql`
query taskColumnsByProject(
    $taskColumnIds: [ID]!
) {
    taskColumnsByProject( taskColumnIds: $taskColumnIds ) {
      _id
      columnName
      sequence
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