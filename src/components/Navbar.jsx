import React, { Component } from 'react'
import { isAuthenticated } from '../scenes/auth/isauth';
import { logout } from '../scenes/auth/isauth';
const Navbar = () => {
  
  return (

    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  {/* <a class="navbar-link h1 font-italic" href="#">Invest Here</a> */}
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  {!isAuthenticated() && <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link h3" href="/">Home<span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link h3" href="/signup">SignUp</a>
      </li>
 
      <li class="nav-item h3">
        <a class="nav-link " href="/signin">LogIn</a>
      </li>
    </ul>

  </div>}

  {isAuthenticated() && <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link h3">LogOut<span class="sr-only">(current)</span></a>
      </li>
    </ul>

  </div>}
</nav>
  );
};

export default Navbar;
