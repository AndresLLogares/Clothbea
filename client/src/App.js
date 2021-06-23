import React from 'react';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import LandPage from './components/landpage/landpage.js';
import Navbar from './components/navbar/navbar.js';
import Login from './components/login/login.js';
import ScrollToTop from './components/scrollToTop/ScrollToTop.js'
import Home from './components/home/home.js';
import Details from './components/details/details.js';
import Shopping from './components/shoppingcart/shoppingcart.js';
import AboutMe from './components/aboutme/aboutme.js';
import WishList from './components/wishlist/wishlist.js';
import PostCart from './components/postcart/postcart.js';
import Reset from './components/reset/reset.js';
import EditProduct from './components/editproduct/editproduct.js';
import CreateCategory from './components/createcategory/createcategory.js';
import CreateProduct from './components/createproduct/createproduct.js';
import './scss/app/app.css';

function App() {
  return (
    <BrowserRouter>
      <Route exact path='/Home' component={Navbar} />
      <Route exact path='/Login' component={Navbar} />
      <Route exact path='/Details' component={Navbar} />
      <Route exact path='/Shopping' component={Navbar} />
      <Route exact path='/AboutMe' component={Navbar} />
      <Route exact path='/Wishlist' component={Navbar} />
      <Route exact path='/Shipments' component={Navbar} />
      <Route exact path='/Reset' component={Navbar} />
      <Route exact path='/EditProduct' component={Navbar} />
      <Route exact path='/CreateProduct' component={Navbar} />
      <Route exact path='/CreateCategory' component={Navbar} />
      <ScrollToTop />
      <Switch>
        <Route exact path='/' component={LandPage} />
        <Route exact path='/Home' component={Home} />
        <Route exact path='/Login' component={Login} />
        <Route exact path='/Details' component={Details} />
        <Route exact path='/Shopping' component={Shopping} />
        <Route exact path='/AboutMe' component={AboutMe} />
        <Route exact path='/Wishlist' component={WishList} />
        <Route exact path='/Shipments' component={PostCart} />
        <Route exact path='/Reset' component={Reset} />
        <Route exact path='/EditProduct' component={EditProduct} />
        <Route exact path='/CreateProduct' component={CreateProduct} />
        <Route exact path='/CreateCategory' component={CreateCategory} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
