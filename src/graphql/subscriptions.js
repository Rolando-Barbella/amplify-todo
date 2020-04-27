/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTodo = /* GraphQL */ `
  subscription OnCreateTodo {
    onCreateTodo {
      id
      name
    }
  }
`;

export const onCreateOrDeleteTodo = /* GraphQL */ `
  subscription onCreateOrDeleteTodo {
    onCreateTodo {
      id
      name
    }
    onDeleteTodo {
      id
      name
    }
  }
`;

export const onUpdateTodo = /* GraphQL */ `
  subscription OnUpdateTodo {
    onUpdateTodo {
      id
      name
    }
  }
`;
export const onDeleteTodo = /* GraphQL */ `
  subscription OnDeleteTodo {
    onDeleteTodo {
      id
      name
    }
  }
`;
