import { Auth } from 'aws-amplify';
import React, { useState } from 'react';
import InputContainer from '../InputContainer'
import { useHistory } from "react-router-dom";

const ConfirmRegister = ({ setStep }) => {
  let history = useHistory();
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
      console.log('success confirm sign up');
      history.push('./home-page')
    } catch (error) {
      console.log('error', error);
    }
  }

  return (
    <div className="container w-4/12 w-medium">
      <div className="bg-white shadow-xl rounded px-12 pt-6 pb-8 mb-4">
        <h3 className="text-lg text-gray-700">Confirma tu cuenta</h3>
        <InputContainer
          labelName='Email:'
          value={user.username}
          keyValueName="username"
          handleInputChange={(e) => handleInputChange(e, 'username')}
        />
        <InputContainer
          labelName='Code:'
          value={user.authenticationCode}
          handleInputChange={(e) => handleInputChange(e, 'authenticationCode')}
        />
        <button 
          onClick={() => confirmSignUp()}
          className="btn-primary text-white py-3 px-4 focus:outline-none focus:shadow-outline"
        >
          Confirmar
        </button>
        <div 
          style={{ width: '100%' }}
          className="pt-2 text-blue-500 hover:text-blue-600"  
        >
          <span onClick={() => history.goBack()}>Atras</span>
        </div>
      </div>
    </div>
  )
}

export default ConfirmRegister;