import Amplify, { Auth } from 'aws-amplify';
import React, { useState, useEffect } from 'react';
import InputContainer from './components/InputContainer'
import awsconfig from './aws-exports';
import './App.css';

Amplify.configure(awsconfig);

function App() {
  const [user, setUser] = useState({ 
    username: '', 
    password: '', 
    authenticationCode: '',
  });

  const [step, setStep] = useState(0);
  const [signInUser, setSignInUser] = useState({ email: null });

  useEffect(() => {
    Auth.signOut();
    // let getUser = async() => {
    //   try {
    //     let user = await Auth.currentAuthenticatedUser();
    //     console.log('user', user)
    //     } catch (error) {
    //     console.log(error)        
    //   }
    // }
    // getUser();
  },[])

  const handleInputChange = (event, keyName) => {
    event.persist();
    setUser((user) => {
      return { ...user, [keyName]: event.target.value }
    })
  }

  const signUp = async () => {
    try {
      await Auth.signUp({ 
        username: user.username, 
        password: user.password,
      });
      console.log('success');
      setStep(1);
    } catch (error) {
      console.log('error', error);
    }
  }

  const signIn = async () => {
    try {
      await Auth.signIn({ 
        username: user.username, 
        password: user.password,
      });
      let signInUser = await Auth.currentAuthenticatedUser();
      setSignInUser({ email: signInUser.attributes.email });
      console.log('success');
      setStep(4);
    } catch (error) {
      console.log('error', error);
    }
  }


  const confirmSignUp = async() => {
    try {
      await Auth.confirmSignUp(user.username, user.authenticationCode);
      console.log('success confirm sign up');
    } catch (error) {
      console.log('error', error);
    }
  }

  return (
    <div className="app">
       <div className="app-wrapper">
        {
          step === 0 && (
            <>
              <h3>Registrate con AWS Amplify</h3>
              <InputContainer
                labelName='Email:'
                value={user.username}
                keyValueName="username"
                handleInputChange={(e) => handleInputChange(e, 'username')}
              />
               <InputContainer
                labelName='Password:'
                type="password"
                value={user.password}
                handleInputChange={(e) => handleInputChange(e, 'password')}
              />
              <button onClick={() => signUp()}>
                Registrate
              </button>
              <hr/>
              or
              <span onClick={() => setStep(3)}>Sign In</span>
            </>
          )
        }
        {
          step === 1 && (
            <>
              <h3>Confirma tu cuenta</h3>
              <InputContainer
                labelName='Email:'
                value={user.username}
                handleInputChange={(e) => handleInputChange(e, 'username')}
              />
              <InputContainer
                labelName='Codigo:'
                value={user.authenticationCode}
                handleInputChange={(e) => handleInputChange(e, 'authenticationCode')}
              />
              <button onClick={() => confirmSignUp()}>
                Confirmar
              </button>
            </>
          )
        }
        {
          step === 3 && (
            <>
              <h3>Registrate con AWS Amplify</h3>
              <InputContainer
                labelName='Email:'
                value={user.username}
                handleInputChange={(e) => handleInputChange(e, 'username')}
              />
               <InputContainer
                labelName='Password:'
                type="password"
                value={user.password}
                handleInputChange={(e) => handleInputChange(e, 'password')}
              />
              <button
                onClick={() => signIn()}
              >
                Sign In
              </button>
            </>
          )
        }
        {
          step === 4 && (
            <>
             <h3>Welcome</h3>
             <p>{signInUser.email}</p>
            </>
          )
        }
      </div>
    </div>
  );
}

export default App
