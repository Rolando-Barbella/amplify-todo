import { Auth } from 'aws-amplify';
import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import InputContainer from '../InputContainer';

const SignIn = () => {
  let history = useHistory();
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
      history.push('./')
      console.log('success sign in');
    } catch (error) {
      console.log('error', error);
    }
  }
  return (
    <div className="container w-4/12 w-medium">
      <div className="bg-white shadow-xl rounded px-12 pt-6 pb-8 mb-4">
        <h3 className="text-lg text-gray-800">Entra a la aplicación</h3>
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
          className="btn-primary text-white py-3 px-4 focus:outline-none focus:shadow-outline"
        >
          Entrar
      </button>
        <div style={{ width: '100%' }} className="pt-3">
          <hr/>
          <p className="text-gray-700 pb-2 pt-2 text-md">No tienes una cuenta?</p>
          <span
            className="pt-2 text-blue-500 hover:text-blue-600" 
            onClick={() => history.push('./register')}
          >
            Registrate
          </span>
        </div>
      </div>
    </div>
  )
}

export default SignIn;