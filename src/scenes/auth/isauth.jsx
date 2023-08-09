import axios from "axios";

export const isAuthenticated = () => {
    if (typeof window == undefined) {
      return false;
    }
    if (localStorage.getItem("jwt")) {
      return true;
      //TODO: compare JWT with database json token
    } else {
      return false;
    }
  };

  export const signup = (user) => {

    console.log(user.id);
    const bookInstanceObject = {
        id: user.id,
        name : user.name,
        email : user.email,
        password : user.password
      };
    
      axios
        .post('http://localhost:8080/user/save', bookInstanceObject)
        .then(res => {
          console.log(res.data);
        })
        .catch(error => {
          console.log(error);
        });

  };

export const signin = (user) => {

    console.log(user.id);
    const bookInstanceObject = {
        email : user.email,
        password : user.password
      };
    
      axios
        .post('http://localhost:8080/user/login', bookInstanceObject)
        .then(res => {
          console.log(res.data);
          localStorage.setItem("jwt", "suc");
        })
        .catch(error => {
          console.log(error);
        });
  };

export const logout = () =>{
    localStorage.removeItem("jwt");
};