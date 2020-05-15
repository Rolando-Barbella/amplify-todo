import { Auth } from 'aws-amplify';
import React, { useState } from 'react';
import InputContainer from '../InputContainer'
import { useHistory } from "react-router-dom";

const ForgotPassword = () => {
  let history = useHistory();
  const [user, setUser] = useState({ username: '' });

  const handleInputChange = (event, keyName) => {
    event.persist();
    setUser((user) => {
      return { ...user, [keyName]: event.target.value }
    })
  }

  const forgotPassword = async () => {
    try {
      await Auth.forgotPassword(user.username);
      console.log('success');
      history.push("/forgot-password-submit");
    } catch (error) {
      console.log('error', error);
    }
  }
  return (
    <div className="container w-4/12 w-medium">
      <div className="bg-white shadow-xl rounded px-12 pt-6 pb-8 mb-4">
        <h3 className="text-lg text-gray-700">Recuperar acceso</h3>
        <InputContainer
          labelName='Email:'
          value={user.username}
          handleInputChange={(e) => handleInputChange(e, 'username')}
        />
        <button 
          onClick={() => forgotPassword()}
          className="btn-primary text-white py-3 px-4 focus:outline-none focus:shadow-outline"
        >
          Enviar codigo
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

export default ForgotPassword;