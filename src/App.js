import Amplify, { Auth } from 'aws-amplify';
import React, { useState, useEffect } from 'react';
import ConfirmRegister from './components/ConfirmRegister'
import ForgotPassword from './components/ForgotPassword'
import ForgotPasswordSubmit from './components/ForgotPasswordSubmit'
import Register from './components/Register'
import SignIn from './components/SignIn'
import HomePage from './pages/home';
import awsconfig from './aws-exports';
import {
  TransitionGroup,
  CSSTransition
} from "react-transition-group";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import './tailwind.generated.css';

Amplify.configure(awsconfig);

function App() {
  return (
    <div className="app-wrapper">
      <Router>
        <Switch>
          <Route component={ForgotPasswordSubmit} path="/forgot-password-submit" />
          <Route component={ForgotPassword} path="/forgot-password" />
          <Route component={SignIn} path="/sign-in" />
          <Route component={ConfirmRegister} path="/confirm-register" />
          <Route component={HomePage} path="/home-page" />
          <Route component={Register} path="/" />
        </Switch>
      </Router>
    </div>
  );
}

export default App
