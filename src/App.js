import React, { useContext, useState } from "react";
import { Route, Switch, useHistory, Redirect } from "react-router-dom";
import axios from "axios";
import { GoogleLogin } from "react-google-login";

import Webinar from "./components/webinar";

import User from "./components/user";
import Institute from "./components/institute";
import OrderList from "./components/order";
import Book from "./components/book";
import logo from "./logo.png";
import { AdminName, AdminPhoto } from "./components/context/storage";

function App() {
 let history = useHistory();

 const [webinarList, setWebinarList] = useState([]);
 const [access, setAccess] = useState("");
 const [name, setName] = useContext(AdminName);
 const [photo, setPhoto] = useContext(AdminPhoto);
 return (
  <Switch>
   <Route exact path="/">
    {!name ? (
     <div className="text-center page">
      <main className="form-login">
       <img className="mb-4" src={logo} alt="" />
       <GoogleLogin
        clientId="526565895378-0u79l74057grs0n8ekqaa1kvb3htt3ej.apps.googleusercontent.com"
        // arjunafe 526565895378-0u79l74057grs0n8ekqaa1kvb3htt3ej.apps.googleusercontent.com
        // localhost 526565895378-md97pueiv8m2t3c682eamv293tt4gaa6.apps.googleusercontent.com
        // arjuna-crm 526565895378-jbcgv3gtftmcftv7lonjn3qbue4raj62.apps.googleusercontent.com
        render={(renderProps) => (
         <button onClick={renderProps.onClick} className="btn btn-lg btn-primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-google" viewBox="0 0 16 16">
           <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
          </svg>
          <p style={{ display: "inline-block", marginLeft: "10px", marginBottom: "5px" }}>Login through Gmail</p>
         </button>
        )}
        onSuccess={(mail) => {
         console.log(mail);
         if (mail.profileObj.email === "rahulkudum@gmail.com") {
          setName(mail.profileObj.name);
          setPhoto(mail.profileObj.imageUrl);
          setAccess("access");
          history.push("/webinar");
         } else {
          alert("sorry you don't have access to this website");
         }
        }}
        onFailure={(res) => {}}
        cookiePolicy={"single_host_origin"}
       />
      </main>
     </div>
    ) : (
     <Redirect to="/webinar" />
    )}
   </Route>

   <Route path="/webinar">{name ? <Webinar /> : <Redirect to="/" />}</Route>
   <Route path="/student">{name ? <User /> : <Redirect to="/" />}</Route>
   <Route path="/institute">{name ? <Institute /> : <Redirect to="/" />}</Route>
   <Route path="/order">{name ? <OrderList /> : <Redirect to="/" />}</Route>
   <Route path="/book">{name ? <Book /> : <Redirect to="/" />}</Route>
  </Switch>
 );
}

export default App;
