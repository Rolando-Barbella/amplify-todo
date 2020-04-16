import '@aws-amplify/ui/dist/style.css';
import Amplify, { Analytics, API, graphqlOperation, Storage } from 'aws-amplify';
import { Connect, S3Album, withAuthenticator } from 'aws-amplify-react'; // or 'aws-amplify-react-native';
import React, { useEffect, useState } from 'react';
import AddTodo from './components/AddTodo';
import './App.css';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);
Storage.configure({ level: 'private' });

const signUpConfig = {
  header: 'My Customized Sign Up',
  hideAllDefaults: true,
  defaultCountryCode: '1',
  signUpFields: [
    {
      label: 'Password',
      key: 'password',
      required: true,
      displayOrder: 2,
      type: 'password'
    },
    {
      label: 'Email',
      key: 'email',
      required: true,
      displayOrder: 1,
      type: 'string'
    }
  ]
};

const listTodos = `query listTodos{
  listTodos{
    items {
      id
      name
      description
    }
  }
}`;

const addTodo = `mutation createTodo($name:String! $description:String!) {
  createTodo(input: {
    name: $name
    description: $description
  }){
    id
    name
    description
  }
}`

const ListView = ({ todos }) => (
  <div>
    <h3>All Todos</h3>
    <ul>
      {todos.map(todo => <li key={todo.id}>{todo.name} ({todo.id})</li>)}
    </ul>
  </div>
);    


function App() {
  const [img, setFile ] = useState({ file: null })
  
  const uploadFile = (evt) => {
    const file = evt.target.files[0];
    const name = file.name;
  
    Storage.put(name, file).then(() => {
      setFile({ file: name });
    })
  }

  useEffect(() => {
    Analytics.record('Amplify_CLI');
  },[]);

  const todoMutation = async() => {
    const todoDetails = {
      name: 'Party tonight',
      description: 'Amplify CLI rocks!'
    };
    const newTodo = await API.graphql(graphqlOperation(addTodo, todoDetails));
    alert(JSON.stringify(newTodo));
  }

  return (
    <div className="App">
      <header className="App-header">
        <h3>Mi aplicacion con AWS</h3>
        <p> Pick a file</p>
        <input type="file" onChange={uploadFile} />
        <Connect mutation={graphqlOperation(addTodo)}>
          {({mutation}) => (
              <AddTodo onCreate={mutation}/>
            )
          }
        </Connect>
        <Connect query={graphqlOperation(listTodos)}>
          {({ data: { listTodos }, loading, errors }) => {
            if (errors.length) return (<h3>Error</h3>);
            if (loading || !listTodos) return (<h3>Loading...</h3>);
            return (<ListView todos={listTodos.items} /> );
          }}
        </Connect>
        <S3Album level="private" path='' />
      </header>
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
