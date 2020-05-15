import React, { useState, useEffect } from 'react'; 
import { Auth } from 'aws-amplify';
import { FaFacebookF } from 'react-icons/fa'
import InputContainer from '../InputContainer'
import { useLocation, useHistory } from 'react-router-dom';

const Register = () => {
  let history = useHistory();
  const [user, setUser] = useState({ username: '', password: '', });

  // useEffect(() => {
  //   let getUser = async() => {
  //     try {
  //       // Auth.signOut();
  //       let user = await Auth.currentAuthenticatedUser();
  //       debugger
  //       console.log('user', user);
  //     } catch (error) {
  //       console.log(error)        
  //     }
  //   }
  //   getUser();
  // },[]);

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
      history.push("/confirm-register");
    } catch (error) {
      console.log('error', error);
    }
  }

  let location = useLocation();
  const registerFb = async() => {
    debugger
    try {
      console.log(location.pathname);
      await Auth.federatedSignIn({ provider: "Facebook" } );
      if(location.pathname  !== '/') {
        alert('hereee')
      }
      // await Auth.currentAuthenticatedUser();
      // console.log(location.pathname);

      debugger
      // await history.push("/home-page");
    } catch(e) {
      console.log('not possible')
    }
  }
  return (
    <div className="container w-4/12 w-medium">
      <div className="bg-white shadow-xl rounded px-12 pt-6 pb-8 mb-4">
        <h3 className="text-lg text-gray-700">Registrate con AWS amplify</h3>
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
        <div className="flex items-center justify-between">
          <button
            className="btn-primary text-white py-3 px-4 focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => signUp()}
          >
            Registrate
          </button>
          <a
            className="link inline-block align-baseline text-sm text-gray-500 hover:text-gray-800"
            href=""
            onClick={() => history.push('./forgot-password')}
          >
            Forgot Password?
          </a>
        </div>
        <div className="flex items-center justify-center object-none object-center pt-4">
          <div
            onClick={() => registerFb()}
            className="fb rounded-t-full rounded-r-full rounded-b-full text-white py-5 px-5 focus:outline-none focus:shadow-outline"
          >
            <FaFacebookF
              size={16}
            />
          </div>
        </div>
        <div style={{ width: '100%' }} className="pt-3">
          <hr />
          <p className="text-gray-700 pb-2 pt-2 text-md">Posees una cuenta?</p>
          <p 
            onClick={() => history.push('./sign-in')}
            className="inline-block align-baseline text-md text-blue-500 hover:text-blue-800"
          >
            Ingresa
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register;