import { Auth } from 'aws-amplify';
import React, { useState } from 'react';
import InputContainer from '../InputContainer'


const ConfirmRegister = ({ setStep }) => {
  const [user, setUser] = useState({ username: '', authenticationCode: '', });

  const handleInputChange = (event, keyName) => {
    event.persist();
    setUser((user) => {
      return { ...user, [keyName]: event.target.value }
    })
  }

  const confirmSignUp = async() => {
    try {
      await Auth.confirmSignUp(user.username, user.authenticationCode);
      setStep();
      console.log('success confirm sign up');
    } catch (error) {
      console.log('error', error);
    }
  }

  return (
    <>
      <InputContainer
        labelName='Email:'
        value={user.username}
        keyValueName="username"
        handleInputChange={(e) => handleInputChange(e, 'username')}
      />
      <InputContainer
        labelName='Code:'
        value={user.password}
        handleInputChange={(e) => handleInputChange(e, 'authenticationCode')}
      />
      <button onClick={() => confirmSignUp()}>
        Confimar
      </button>
    </>
  )
}

export default ConfirmRegister;