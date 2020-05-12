import { Auth } from 'aws-amplify';
import React, { useState } from 'react';
import InputContainer from '../InputContainer'


const Register = ({ setStep }) => {
  const [user, setUser] = useState({ username: '', password: '', });

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
      <hr />
    </>
  )
}

export default Register;