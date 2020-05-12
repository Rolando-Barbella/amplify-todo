import { Auth } from 'aws-amplify';
import React, { useState } from 'react';
import InputContainer from '../InputContainer'

const SignIn = ({ setStep }) => {
  const [user, setUser] = useState({ username: '', authenticationCode: '', });

  const handleInputChange = (event, keyName) => {
    event.persist();
    setUser((user) => {
      return { ...user, [keyName]: event.target.value }
    })
  }

  const signIn = async () => {
    try {
      await Auth.signIn({ 
        username: user.username, 
        password: user.password,
      });
      console.log('success sign in');
      setStep();
    } catch (error) {
      console.log('error', error);
    }
  }
  return (
    <>
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

export default SignIn;