import '@aws-amplify/ui/dist/style.css';
import Amplify, { Analytics, graphqlOperation, Auth } from 'aws-amplify';
import { Connect, withAuthenticator } from 'aws-amplify-react'; // or 'aws-amplify-react-native';
import React, { useEffect } from 'react';
import AddTodo from './components/AddTodo';
import ListView from './components/ListView';
import './App.css';
import awsconfig from './aws-exports';
import * as subscriptions from './graphql/subscriptions';

Amplify.configure(awsconfig);


const signUpConfig = {
  header: 'My Customized Sign Up',
  hideAllDefaults: true,
  defaultCountryCode: '1',
  signUpFields: [
    {
      label: 'Email',
      key: 'email',
      required: true,
      displayOrder: 1,
      type: 'string'
    },
    {
      label: 'Password',
      key: 'password',
      required: true,
      displayOrder: 2,
      type: 'password'
    },
  ]
};

const listTodos = `query listTodos{
  listTodos{
    items {
      id
      name
    }
  }
}`;

const addTodo = `mutation createTodo($name:String!) {
  createTodo(input: {
    name: $name
  }){
    id
    name
  }
}`

function App() {
  useEffect(() => {
    let getUser = async () => {
      let user = await Auth.currentAuthenticatedUser()
      console.log(user)
    }
    getUser();
    Analytics.record('Amplify_CLI');
  },[]);

  return (
    <div className="App">
      <div>
        <h3>Mi aplicacion con AWS</h3>
        <Connect mutation={graphqlOperation(addTodo)}>
          {({mutation}) => (
              <AddTodo onCreate={mutation}/>
            )
          }
        </Connect>
        <Connect 
          query={graphqlOperation(listTodos)}
          subscription={graphqlOperation(subscriptions.onCreateTodo)}
          onSubscriptionMsg={(prev, { onCreateTodo }) => {
            console.log(prev)
            prev.listTodos.items = prev.listTodos.items.concat(onCreateTodo)
            return prev; 
          }}
        >
          {({ mutation, data: { listTodos }, loading, errors }) => {
            if (errors.length) return (<h3>Error</h3>);
            if (loading || !listTodos) return (<h3>Loading...</h3>);
            return (
              <ListView mutation={mutation} todos={listTodos.items} /> 
            );
          }}
        </Connect>
      </div>
    </div>
  );
}

export default withAuthenticator(
  App, 
  { 
    signUpConfig, 
    usernameAttributes: 'email',
    includeGreetings: true,
  } 
);
