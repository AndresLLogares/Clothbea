import React from 'react';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import LandPage from './components/landpage/landpage.js';
import Navbar from './components/navbar/navbar.js';
import Login from './components/login/login.js';
import ScrollToTop from './components/scrollToTop/ScrollToTop.js'
import Home from './components/home/home.js';
import Details from './components/details/details.js';
import './scss/app/app.css';

function App() {
  return (
    <BrowserRouter>
      <Route exact path='/Home' component={Navbar} />
      <Route exact path='/Login' component={Navbar} />
      <Route exact path='/Details' component={Navbar} />
      <ScrollToTop />
      <Switch>
        <Route exact path='/' component={LandPage} />
        <Route exact path='/Home' component={Home} />
        <Route exact path='/Login' component={Login} />
        <Route exact path='/Details' component={Details} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
