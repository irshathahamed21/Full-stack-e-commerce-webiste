import React, {useState, useEffect, useRef} from 'react'
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import {Link} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"

import "./loginsignup.css"



const LoginSignup = ( {history, location}) => {

    const dispatch = useDispatch()

    const loginTab = useRef(null)
    const registerTab = useRef(null)
    const switcherTab = useRef(null)

    const[loginEmail, setLoginEmail] = useState("")
    const[loginPassword, setLoginPassword] = useState("")
    
    const [user, setUser] = useState({
        name:"",
        email:"",
        password:""
    })

    

    const {name, email, password} = user
    const [avatar, setAvatar] = useState("./Profile.png")
    const [avatarPreview, setAvatarPreview] = useState("./Profile.png")

    const loginSubmit = (e) => {
        e.preventDefault()


    }

    const registerSubmit = (e) => {
        e.preventDefault()

        const myForm = new FormData()

        myForm.set("name", name)
        myForm.set("email", email)
        myForm.set("password", password)
        myForm.set("avatar", avatar)

    }

    const registerDataChange = (e) => {
        if(e.target.name === "avatar") {
            const reader = new FileReader()

            reader.onload = () => {
                if (reader.readyState === 2) {
                  setAvatarPreview(reader.result);
                  setAvatar(reader.result);
                }
              };


        }
        else {
            setUser({...user, [e.target.name] : e.target.value})
        }
    }

    const switchTabs = (e,tab) => {
        if (tab === "login") {
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");
      
            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");
          }
          if (tab === "register") {
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");
      
            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");
          }
    }

    


    
  return (
   <>
   <div className="LoginSignupContainer">
    <div className="LoginSignupBox">
        <div>
            <div className="login_signup_toggle">
                <p onClick={(e) => switchTabs(e, "login")} >LOGIN</p>
                <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
            </div>
            <button ref={switcherTab}></button>
        </div>
        <form className="loginForm"  encType="multipart/form-data" ref = {loginTab} onSubmit = {loginSubmit}>
            <div className="loginEmail">
                <MailOutlineIcon />
                <input  
                    type = "email" 
                    placeholder="Email"
                    required
                    value = {loginEmail}
                    onChange = {(e) => {setLoginEmail(e.target.value)}}
                />
            </div>
            <div className="loginPassword">
                <LockOpenIcon />
                <input  
                    type = "password" 
                    placeholder="Password"
                    required
                    value = {loginPassword}
                    onChange = {(e) => {setLoginPassword(e.target.value)}}
                  />
            </div>
            <Link to="/password/forgot">Forget Password ?</Link>
            <input type="submit" value="Login" className="loginBtn" />
        </form>
        <form className = "signupForm" ref = {registerTab} encType="multipart/form-data" onSubmit = {registerSubmit}>
            <div className="signupName">
                <FaceIcon/>
                <input 
                    type="text"
                    placeholder='Name'
                    required
                    name = "name"
                    value = {name}
                    onChange = {registerDataChange}
                 />
            </div>
            <div className="signupEmail">
                <MailOutlineIcon />
                <input  
                    type = "email" 
                    placeholder="Email"
                    required
                    name = "email"
                    value = {email}
                    onChange = {registerDataChange}
                />
            </div>
            <div className="signupPassword">
                <LockOpenIcon />
                <input  
                    type = "password" 
                    placeholder="Password"
                    required
                    name = "password"
                    value = {password}
                    onChange = {registerDataChange}
                  />
            </div>
            <div id="registerImage">
                <img src = "https://github.com/meabhisingh/mernProjectEcommerce/blob/master/frontend/public/Profile.png" alt = "Avatar Preview" />
                <input  
                    type="file" 
                    name='avatar'
                    accept = "image/*"
                    onChange = {registerDataChange}
                 />
            </div>
            <input type="submit" value="Register" className='signupBtn' />
        </form>
    </div>

   </div>
   </>

  )
}

export default LoginSignup