import Amplify, { Auth } from 'aws-amplify';
import React, { useState, useEffect } from 'react';
import ConfirmRegister from './components/ConfirmRegister'
import Register from './components/Register'
import SignIn from './components/SignIn'
import awsconfig from './aws-exports';
import './App.css';

Amplify.configure(awsconfig);

function App() {
  const [step, setStep] = useState(0);
  const [signInUser, setSignInUser] = useState({ email: null });

  useEffect(() => {
    let getUser = async() => {
      try {
        Auth.signOut();
        let user = await Auth.currentAuthenticatedUser();
        await setSignInUser({ email: user.attributes.email});
        console.log('user', user);
      } catch (error) {
        console.log(error)        
      }
    }
    getUser();
  },[step]);

  return (
    <div className="app">
       <div className="app-wrapper">
        {
          step === 0 && (
            <>
              <h3>Registrate con AWS Amplify</h3>
              <Register
                setStep={() => setStep(1)}
              />
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
              <ConfirmRegister
                setStep={() => setStep(4)}
              />
            </>
          )
        }
        {
          step === 3 && (
            <>
              <h3>Entra a la aplicación</h3>
              <SignIn setStep={()=> setStep(4)}/>
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
