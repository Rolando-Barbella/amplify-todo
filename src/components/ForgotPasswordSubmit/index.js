import { Auth } from 'aws-amplify';
import React, { useState } from 'react';
import InputContainer from '../InputContainer'
import { useHistory } from "react-router-dom";

const ForgotPasswordSubmit = () => {
  let history = useHistory();
  const [user, setUser] = useState({ username: '', password: '', authenticationCode: '' });

  const handleInputChange = (event, keyName) => {
    event.persist();
    setUser((user) => {
      return { ...user, [keyName]: event.target.value }
    })
  }

  const forgotPasswordSubmit = async () => {
    try {
      await Auth.forgotPasswordSubmit(user.username, user.authenticationCode, user.password);
      console.log('success');
      // history.push("/forgot-password-submit");
    } catch (error) {
      console.log('error', error);
    }
  }
  return (
    <div className="container w-4/12 w-medium">
      <div className="shadow-lg rounded px-12 pt-6 pb-8 mb-4">
        <h3 className="text-lg text-gray-700">Reenviar datos de cuenta</h3>
        <InputContainer
          labelName='Email:'
          value={user.username}
          handleInputChange={(e) => handleInputChange(e, 'username')}
        />
        <InputContainer
          labelName='Code:'
          value={user.authenticationCode}
          handleInputChange={(e) => handleInputChange(e, 'authenticationCode')}
        />
        <InputContainer
          labelName='Password:'
          type='password'
          value={user.password}
          handleInputChange={(e) => handleInputChange(e, 'password')}
        />
        <button 
          onClick={() => forgotPasswordSubmit()}
          className="btn-primary text-white py-3 px-4 focus:outline-none focus:shadow-outline"
        >
          Enviar datos
        </button>
        <div 
          className="pt-2 text-blue-500 hover:text-blue-600" 
          style={{ width: '100%' }}
        >
          <span onClick={() => history.goBack()}>Atras</span>
        </div>
      </div>
    </div>
  )
}

export default ForgotPasswordSubmit;