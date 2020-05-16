import { Auth } from 'aws-amplify';
import React, { useState, useEffect }  from 'react';
import { useHistory } from 'react-router-dom'

const HomePage = ({ userEmail }) => {
  const [signInUser, setSignInUser] = useState({ email: null });
  const [isLoading, setIsLoading] = useState(true);

  let history = useHistory();

  useEffect(() => {
    let getUser = async() => {
      try {
        let user = await Auth.currentAuthenticatedUser();
        await setSignInUser({ email: user.attributes.email});
        setIsLoading(false);
        console.log('user from home', user);
      } catch (error) {
        setIsLoading(false);
        history.push('./sign-in')
        console.log(error)        
      }
    }
    getUser();
  },[]);

  if(isLoading) {
    return <p>...Loading</p>
  }
  return (
    <>
      <h3>Bienvenido!</h3>
      <p>{signInUser.email}</p>
    </>
  )
}

export default HomePage;