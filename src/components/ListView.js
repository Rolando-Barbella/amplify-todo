import React from 'react';
import { graphqlOperation } from 'aws-amplify';
import { Connect } from 'aws-amplify-react'; // or 'aws-amplify-react-native';
import * as subscriptions from '../graphql/subscriptions'

const deleteTodo = `mutation deleteTodo($id:ID! ) {
  deleteTodo(input: {
    id: $id
  }){
    id
  }
}`


const ListView = ({ todos, mutation }) => {
  return (
    <div>
      <Connect 
        mutation={graphqlOperation(deleteTodo)}
        subscription={graphqlOperation(subscriptions.onDeleteTodo)}
        onSubscriptionMsg={(prev, { onDeleteTodo }) => {
          console.log(onDeleteTodo, prev)
          // prev.listTodos.items = prev.listTodos.items.concat(onCreateTodo)
          return prev; 
        }}
      >
        {({ mutation }) => {
          return (
            <ul>
              {todos.map(todo => {
                return ( 
                  <li key={todo.id}>
                    {todo.name}
                    <span 
                      className="close"
                      onClick={() => mutation({ id: todo.id })}
                    >
                      ×
                    </span>
                  </li>
                )
              })}
            </ul>
          )
        }}
      </Connect>
    </div>
  )
};    

export default ListView;