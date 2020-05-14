import { Auth } from 'aws-amplify';
import React, { useState, useEffect }  from 'react';

const HomePage = ({ userEmail }) => {
  const [signInUser, setSignInUser] = useState({ email: null });

  useEffect(() => {
    let getUser = async() => {
      try {
        // Auth.signOut();
        let user = await Auth.currentAuthenticatedUser();
        await setSignInUser({ email: user.attributes.email});
        console.log('user', user);
      } catch (error) {
        console.log(error)        
      }
    }
    getUser();
  },[]);

  return (
    <>
      <h3>Bienvenido!</h3>
      <p>{signInUser.email}</p>
    </>
  )
}

export default HomePage;